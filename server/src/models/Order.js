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
  userSocketId: {
    type: String,
    nuique: true,
  },
  path: {
    type: Array,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
