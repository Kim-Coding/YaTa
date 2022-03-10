const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/request", async (req, res) => {
  const {
    userSocketId,
    userId,
    userType,
    startLatLon,
    startAddress,
    destinationLatLon,
    destinationAddress,
    path,
    status,
  } = req.body;

  await new Order({
    userSocketId: userSocketId,
    userId: userId,
    userType: userType,
    startLatLon: startLatLon,
    startAddress: startAddress,
    destinationAddress: destinationAddress,
    destinationLatLon: destinationLatLon,
    path: path,
    status: status,
  }).save();

  const io = req.app.get("io");
  io.sockets.emit("clientCallToDriver", {
    path: path,
    userSocketId: userSocketId,
    startAddress: startAddress,
    startLatLon: startLatLon,
    destinationAddress: destinationAddress,
    destinationLatLon: destinationLatLon,
  });
});

router.post("/accept", async (req, res) => {
  const { userSocketId } = req.body;
  const userData = await Order.findOne({ userSocketId: userSocketId });

  if (userData.status === "waiting") {
    await Order.updateOne(
      {
        status: userData.status,
      },
      { status: "driving" }
    );
    const io = req.app.get("io");
    io.to(userSocketId).emit("successMatching");
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

router.post("/cancel", async (req, res) => {
  const {
    socketId,
    userId,
    userType,
    startLatLon,
    startAddress,
    destinationLatLon,
    destinationAddress,
  } = req.body;

  await Order.deleteOne({
    socketId: socketId,
    userId: userId,
    userType: userType,
    startLatLon: startLatLon,
    startAddress: startAddress,
    destinationLatLon: destinationLatLon,
    destinationAddress: destinationAddress,
    status: "waiting",
  });

  res.json({ result: true });
});

router.post("/driverlocation", async (req, res) => {
  const { userSocketId, driverLatLon } = req.body;

  const io = await req.app.get("io");
  io.to(userSocketId).emit("driverLocation", driverLatLon);
});

router.post("/driverpickup", async (req, res) => {
  const { userSocketId } = req.body;
  const userData = await Order.findOne({ userSocketId: userSocketId });
  const io = await req.app.get("io");
  io.to(userSocketId).emit("driverPickUp", {
    latlon: userData.destinationLatLon[0],
    desPath: userData.path,
  });
  res.json({ result: true });
});

module.exports = router;
