const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { encryptPassword, isComparedPassword } = require("../utils/bcrypt");
require("dotenv").config();

router.post("/signin", async (req, res) => {
  try {
    await User.findOne({ id: req.body.id }).then((data) => {
      if (isComparedPassword(req.body.pw, data.pw)) {
        const accessToken = jwt.sign(
          {
            id: data.id,
            userType: data.userType,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = data.refreshToken;
        res.status(201).json({
          result: true,
          userType: data.userType,
          accessToken,
          refreshToken,
        });
      } else {
        res.json({ result: false });
      }
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/signup", async (req, res) => {
  const user = { id: req.body.id, userType: req.body.userType };
  await User.findOne(user).then((data) => {
    if (data) {
      res.json({ err: "아이디중복" });
    } else {
      const refreshToken = jwt.sign({}, process.env.REFRESH_KEY, {
        expiresIn: "7d",
      });
      new User({
        id: req.body.id,
        pw: encryptPassword(req.body.pw),
        userType: req.body.userType,
        refreshToken: refreshToken,
      }).save();
      res.json({ result: true });
    }
  });
});

router.get("/verify", (req, res) => {
  const readToken = req.rawHeaders[29];

  if (readToken === "1") {
    res.json({ result: false, isLogin: false });
  } else {
    const token = readToken.split("; ");
    try {
      const accessToken = token
        .find((row) => row.startsWith("accessToken"))
        .split("=");

      const decodedAcessToken = jwt.verify(
        accessToken[1],
        process.env.SECRET_KEY
      );
      if (decodedAcessToken) {
        res.json({
          result: true,
          isLogin: true,
          userType: decodedAcessToken.userType,
        });
      } else {
        res.json({ result: false, error: "unauthorized" });
      }
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = token
          .find((row) => row.startsWith("refreshToken"))
          .split("=");
        try {
          const decodedRefreshToken = jwt.verify(
            refreshToken[1],
            process.env.REFRESH_KEY
          );
          if (decodedRefreshToken) {
            User.findOne({ refreshToken: refreshToken[1] }).then((data) => {
              const newAccessToken = jwt.sign(
                {
                  id: data.id,
                  userType: data.userType,
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: "1h",
                }
              );
              res.json({
                result: true,
                userType: data.userType,
                accessToken: newAccessToken,
              });
            });
          } else {
            res.json({ result: false, error: "unauthorized" });
          }
        } catch (e) {
          if (err.name === "TokenExpiredError") {
            const newRefreshToken = jwt.sign({}, process.env.REFRESH_KEY, {
              expiresIn: "7d",
            });
            User.findOneAndUpdate(
              { refreshToken: refreshToken[1] },
              { $set: { refreshToken: newRefreshToken } }
            );
            res.json({
              result: true,
              userType: data.userType,
              refreshToken: newRefreshToken,
            });
          }
        }
      }
    }
  }
});

module.exports = router;
