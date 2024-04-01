const model = require("../model/schema");
const bcrypt = require("bcryptjs");
const validator = require("../helper/validation");
const apiAuth = require("../helper/apiAuthentication");

/*
User Registration function
Accepts: firstName, lastName, emailId, password 
*/
exports.userReg = async (req, res) => {
  try {
    //Checking email Id exist in DB
    const user = await model.User.findOne({
      emailId: req.body.emailId,
    });
    //If email ID present in database thows error and return message
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
        //Bcrypt password encryption
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

//check the expense functionality -- @aayush

/*
This function is to get all the user email Id's for creating group

*/
exports.emailList = async (req, res) => {
  try {
    //check if the login user is same as the requested user
    const userEmails = await model.User.find(
      {},
      {
        emailId: 1,
        _id: 0,
      }
    );
    if (!userEmails) {
      var err = new Error("User does not exist!");
      err.status = 400;
      throw err;
    }
    var emailList = [];
    for (var email of userEmails) {
      emailList.push(email.emailId);
    }
    res.status(200).json({
      status: "Success",
      user: emailList,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
View User function 
This function is to view the user details 

*/
exports.viewUser = async (req, res) => {
  try {
    //check if the login user is same as the requested user
    apiAuth.validateUser(req.user, req.body.emailId);
    const user = await model.User.findOne(
      {
        emailId: req.body.emailId,
      },
      {
        password: 0,
      }
    );
    if (!user) {
      var err = new Error("User does not exist!");
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      status: "Success",
      user: user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};
