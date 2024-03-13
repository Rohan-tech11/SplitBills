const model = require("../model/schema");

exports.notNull = (value) => {
  if (value) return true;
  else {
    var err = new Error("Please input the required field");
    err.status = 400;
    throw err;
  }
};

exports.emailValidation = (email) => {
  if (email && email.includes("@") && email.includes(".com")) return true;
  else {
    var err = new Error("Email validation fail!!");
    err.status = 400;
    throw err;
  }
};

exports.passwordValidation = (pass) => {
  if (pass && pass.length >= 8) {
    return true;
  }
  var err = new Error("Password validation fail!!");
  err.status = 400;
  throw err;
};
