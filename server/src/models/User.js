const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  pw: {
    type: String,
  },
  userType: {
    type: String,
  },
  refreshToken: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
