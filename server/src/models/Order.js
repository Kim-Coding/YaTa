const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
  },
  startLatLon: {
    type: Array,
  },
  startAddress: {
    type: String,
  },
  destinationLatLon: {
    type: Array,
  },
  destinationAddress: {
    type: String,
  },
  status: {
    type: String,
  },
  socketId: {
    type: String,
    nuique: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
