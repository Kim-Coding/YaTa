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
    userId: userId,
    startAddress: startAddress,
    startLatLon: startLatLon,
    destinationAddress: destinationAddress,
    destinationLatLon: destinationLatLon,
  });
});

router.post("/accept", async (req, res) => {
  const { userId, driverLatLon } = req.body;
  const userData = await Order.findOne({ userId: userId, status: "waiting" });

  if (userData.status === "waiting") {
    await Order.findOneAndUpdate(
      {
        userId: userId,
      },
      { status: "driving" },
      { new: true }
    );
    const io = req.app.get("io");
    io.to(userData.userSocketId).emit("successMatching", driverLatLon);
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
    status,
  } = req.body;

  await Order.deleteOne({
    socketId: socketId,
    userId: userId,
    userType: userType,
    startLatLon: startLatLon,
    startAddress: startAddress,
    destinationLatLon: destinationLatLon,
    destinationAddress: destinationAddress,
    status: status,
  });

  res.json({ result: true });
});

router.post("/driverlocation", async (req, res) => {
  const { userId, driverLatLon } = req.body;
  const userData = await Order.findOne({ userId: userId, status: "driving" });

  const io = await req.app.get("io");
  io.to(userData.userSocketId).emit("driverLocation", driverLatLon);
});

router.post("/driverpickup", async (req, res) => {
  const { userId } = req.body;
  const userData = await Order.findOne({ userId: userId, status: "driving" });
  const io = await req.app.get("io");
  io.to(userData.userSocketId).emit("driverPickUp", {
    desLL: userData.destinationLatLon[0],
    pathD: userData.path,
    startLatLon: userData.startLatLon,
  });
  res.json({ result: true });
});

router.post("/updateid", async (req, res) => {
  const { userSocketId, preSocketId } = req.body;

  await Order.findOneAndUpdate(
    {
      userSocketId: preSocketId,
    },
    { userSocketId: userSocketId },
    { new: true }
  );
});

router.post("/finish", async (req, res) => {
  const { userId } = req.body;
  const userData = await Order.findOne({ userId: userId, status: "driving" });

  await Order.findOneAndUpdate(
    {
      userId: userId,
      status: "driving",
    },
    { status: "finished" },
    { new: true }
  );

  const io = await req.app.get("io");
  io.to(userData.userSocketId).emit("finishDrive");
  res.json({ result: true });
});

module.exports = router;
