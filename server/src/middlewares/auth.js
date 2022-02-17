const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/signin", async function (req, res, next) {
  try {
    const user = await User.find(req.body);
    if (user.length) {
      const token = jwt.sign(
        {
          user_id: user[0].user_id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("user", token);
      res.status(201).json({
        result: "ok",
        token,
      });
    } else {
      res.status(400).json({ error: "invalid user" });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.post("/signup", async function (req, res, next) {
  try {
    const user = await new User(req.body).save();
    res.status(201).json({
      result: "ok",
      user: user,
    });
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
