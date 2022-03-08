const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/accept", async (req, res) => {
  const { socketId } = req.body;
  const userData = await Order.findOne({ socketId: socketId });
  if (userData.status === "waiting") {
    await Order.updateOne(
      {
        status: userData.status,
      },
      { status: "driving" }
    );
    const io = req.app.get("io");
    io.to(socketId).emit("successMatching", true);

    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

router.post("/cancel", async (req, res) => {
  const {
    id,
    userType,
    startLatLon,
    startAddress,
    destinationLatLon,
    destinationAddress,
  } = req.body;

  const result = await Order.deleteOne({
    userId: id,
    userType: userType,
    startLatLon: startLatLon,
    startAddress: startAddress,
    destinationLatLon: destinationLatLon,
    destinationAddress: destinationAddress,
  });
  if (result) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

module.exports = router;
