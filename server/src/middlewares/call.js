const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const io = require("../socket/socket");

router.post("/", async (req, res) => {
  const { socketId } = req.body;
  const userData = await Order.findOne({ socketId: socketId });
  if (userData.status === "waiting") {
    Order.findOneAndUpdate(
      {
        status: userData.status,
      },
      { $set: { status: "driving" } }
    );
    io.to(socketId).emit("successMatching", "성공");
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

module.exports = router;
