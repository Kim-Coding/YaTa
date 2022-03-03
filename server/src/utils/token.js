const User = require("../models/User");
const jwt = require("jsonwebtoken");

const makeAccessToken = async (id, userType) => {
  const accessToken = await jwt.sign(
    {
      id: id,
      userType: userType,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return accessToken;
};

const makeRefreshToken = async (id, userType) => {
  const refreshToken = await jwt.sign(
    {
      id: id,
      userType: userType,
    },
    process.env.REFRESH_KEY,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

const verifyAccessToken = (accessToken) => {
  const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
  return decodedAccessToken;
};

const verifyRefreshToken = (refreshToken) => {
  const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_KEY);
  return decodedRefreshToken;
};

module.exports = {
  makeAccessToken,
  makeRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
