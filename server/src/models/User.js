const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: 1,
  },
  pw: {
    type: String,
    minlength: 5,
  },
  userType: {
    type: String,
  },
  token: { type: String },
  tokenTime: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.pw, salt, function (err, hash) {
        if (err) return next(err);
        user.pw = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
