const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptPassword = (pw) => {
  return bcrypt.hashSync(pw, saltRounds);
};

const isComparedPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
  encryptPassword,
  isComparedPassword,
};
