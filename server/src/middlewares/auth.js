const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/signin", async (req, res, next) => {
  try {
    await User.find(req.body).then((data) => {
      const user = data[0];
      if (user) {
        const token = jwt.sign(
          {
            user_id: user.id,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("user", token);
        res.status(201).json({
          result: true,
          token,
        });
      } else {
        res.json({ result: false });
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    await new User(req.body).save();
    res.json({ result: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/verify", (req, res, next) => {
  try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(clientToken, process.env.SECRET_KEY);
    if (decoded) {
      res.locals.userId = decoded.user_id;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" });
  }
});

module.exports = router;
