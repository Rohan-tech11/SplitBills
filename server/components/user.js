const model = require("../model/schema");
const bcrypt = require("bcryptjs");
const validator = require("../helper/validation");
const apiAuth = require("../helper/apiAuthentication");

/*
User Registeration function
Accepts: firstName, lastName, emailId, password 
Validation: firstname, lastname not Null 
            emailID - contain '@' and '.com' 
            password - min 8, lowecase, uppercase, special character, numbers
API: /users/v1/register
*/
exports.userReg = async (req, res) => {
  try {
    //Checking email Id exist in DB
    const user = await model.User.findOne({
      emailId: req.body.emailId,
    });
    //If email ID present in database thows error and retuen message
    if (user) {
      const err = new Error("Email Id already present please login!");
      err.status = 400;
      throw err;
    } else {
      //Accepts the inputs and create user model form req.body
      var newUser = new model.User(req.body);
      //Performing validations
      if (
        validator.emailValidation(newUser.emailId) &&
        validator.passwordValidation(newUser.password) &&
        validator.notNull(newUser.firstName)
      ) {
        //Bcrypt password encription
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        //storing user details in DB
        var id = await model.User.create(newUser);
        res.status(200).json({
          status: "Success",
          message: "User Registeration Success",
          userId: id.id,
        });
      }
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
User login function
Accepts: email Id & Pass
*/
exports.userLogin = async (req, res) => {
  try {
    //Checking email Id exist in DB
    const user = await model.User.findOne({
      emailId: req.body.emailId,
    });
    if (!user) {
      var err = new Error("Invalid email Id or Password !");
      err.status = 401;
      throw err;
    }

    //validating password using bcrypt
    const validCred = await bcrypt.compare(req.body.password, user.password);
    if (!validCred) {
      var err = new Error("Invalid email Id or Password* !");
      err.status = 401;
      throw err;
    } else {
      const accessToken = apiAuth.generateAccessToken(req.body.emailId);
      res.status(200).json({
        status: "Success",
        message: "User Login Success",
        userId: user.id,
        emailId: user.emailId,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken,
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};
