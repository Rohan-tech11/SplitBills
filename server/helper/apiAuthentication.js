var jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
  return jwt.sign(user, "easesplit");
};
