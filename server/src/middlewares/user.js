const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { encryptPassword, isComparedPassword } = require("../utils/bcrypt");
const {
  makeAccessToken,
  makeRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/token");
require("dotenv").config();

router.post("/signin", async (req, res) => {
  const { id, pw } = req.body;
  const userData = await User.findOne({ id: id });

  if (isComparedPassword(pw, userData.pw)) {
    const accessToken = await makeAccessToken(userData.id, userData.userType);
    const refreshToken = userData.refreshToken;
    res.status(201).json({
      result: true,
      userId: userData.id,
      userType: userData.userType,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    res.json({ result: false });
  }
});

router.post("/signup", async (req, res) => {
  const { id, pw, userType } = req.body;
  console.log(userType);
  const userData = await User.findOne({ id: id, userType: userType });

  if (userData) {
    res.status(401).json({ message: "Exist User" });
  } else {
    const refreshToken = await makeRefreshToken();
    new User({
      id: id,
      pw: encryptPassword(pw),
      userType: userType,
      refreshToken: refreshToken,
    }).save();
    res.json({ result: true });
  }
});

router.get("/auth", async (req, res) => {
  const readToken = req.rawHeaders.filter((ele) => ele.includes("accessToken"));
  if (readToken[0] === undefined) {
    res.json({ result: false });
  } else {
    const token = readToken[0].split("; ");
    const accessToken = token[0].split("=");
    const refreshToken = token[1].split("=");
    const userData = await User.findOne({ refreshToken: refreshToken[1] });

    try {
      const decodedAccessToken = verifyAccessToken(accessToken[1]);
      res.json({
        result: true,
        userType: decodedAccessToken.userType,
      });
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const newAccessToken = await makeAccessToken(
          userData.id,
          userData.userType
        );
        try {
          if (verifyRefreshToken(refreshToken[1])) {
            res.json({
              result: true,
              userType: userData.userType,
              accessToken: newAccessToken,
            });
          }
        } catch (err) {
          if (err.name === "TokenExpiredError") {
            const newRefreshToken = await makeRefreshToken();
            User.findOneAndUpdate(
              { refreshToken: refreshToken[1] },
              { $set: { refreshToken: newRefreshToken } }
            );
            res.json({
              result: true,
              userType: userData.userType,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });
          }
        }
      }
    }
  }
});

module.exports = router;
