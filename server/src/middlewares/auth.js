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
        res.status(201).json({
          result: true,
          accessToken: accessToken,
          refreshToken: data.refreshToken,
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

router.get("/verify", async (req, res) => {
  const token = req.rawHeaders[29].split("; ");

  const accessToken = token
    .find((row) => row.startsWith("accessToken"))
    .split("=");

  try {
    const decodedAcessToken = jwt.verify(
      accessToken[1],
      process.env.SECRET_KEY
    );
    if (decodedAcessToken) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: "unauthorized" });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const refreshToken = token
        .find((row) => row.startsWith("refreshToken"))
        .split("=");
      const decodedRefreshToken = jwt.verify(
        refreshToken[1],
        process.env.REFRESH_KEY
      );
      if (decodedRefreshToken) {
        await User.findOne({ refreshToken: refreshToken[1] }).then((data) => {
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
          res.json({ result: true, accessToken: newAccessToken });
        });
      } else {
        res.json({ result: false, error: "unauthorized" });
      }
    }
  }
});

module.exports = router;
