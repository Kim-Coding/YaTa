const server = require("socket.io");

module.exports = (app) => {
  const io = new server.Server(8080, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });
  app.set("io", io);
};
