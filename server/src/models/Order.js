const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    trim: true,
    unique: 1,
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
    enum: ["waiting", "driving"],
  },
  socketId: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
