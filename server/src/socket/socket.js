const Order = require("../models/Order");
const server = require("socket.io");

module.exports = (app) => {
  const io = new server.Server(8080, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });
  app.set("io", io);

  io.on("connection", (socket) => {
    socket.on("clientCall", async (data) => {
      const {
        socketId,
        id,
        userType,
        startLatLon,
        startAddress,
        destinationLatLon,
        destinationAddress,
        status,
      } = data;
      await new Order({
        socketId: socketId,
        userId: id,
        userType: userType,
        startLatLon: startLatLon,
        startAddress: startAddress,
        destinationAddress: destinationAddress,
        destinationLatLon: destinationLatLon,
        status: status,
      }).save();
      socket.broadcast.emit("clientCallToDriver", {
        socketId: socketId,
        startAddress: startAddress,
        startLatLon: startLatLon,
        destinationAddress: destinationAddress,
        destinationLatLon: destinationLatLon,
      });
    });

    socket.on("disconnect", () => {});
  });
};
