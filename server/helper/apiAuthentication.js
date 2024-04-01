var jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
  return jwt.sign(user, "easesplit");
};

exports.validateToken = (req, res, next) => {
  //Checking  authorization  header is present in the request header
  if (req.headers["authorization"] == null) {
    res.status(403).json({
      message: "JWT Token not present",
    });
  } else {
    //getting token from request
    const authHeader = req.headers["authorization"];
    //split the string and use the second value as jwt token
    const token = authHeader.split(" ")[1];

    //function to verify the token
    jwt.verify(token, "easesplit", (err, user) => {
      if (err) {
        res.sendStatus(403).json({
          message: "Invalid Token",
        });
        res.end();
      } else {
        //Adding user data to the req
        req.user = user;
        //proceed to the next action in the calling function
        next();
      }
    });
  }
};
