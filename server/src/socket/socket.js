const Order = require("../models/Order");
const server = require("socket.io");

const io = new server.Server(8080, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("clientCall", (data) => {
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
    console.log(socketId);
    new Order({
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
  socket.on("cancelCall", (data) => {
    const {
      id,
      userType,
      startLatLon,
      startAddress,
      destinationLatLon,
      destinationAddress,
      status,
    } = data;
    Order.deleteOne({
      userId: id,
      userType: userType,
      startLatLon: startLatLon,
      startAddress: startAddress,
      destinationAddress: destinationAddress,
      destinationLatLon: destinationLatLon,
    });
  });
  socket.on("acceptCall", (text) => {
    console.log(text);
    //DB에 waiting이면 매칭
    socket.emit("successMatching", "수락");
  });

  socket.on("disconnect", () => {});
});

module.exports = io;
