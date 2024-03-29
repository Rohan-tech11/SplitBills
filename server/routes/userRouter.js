var express = require("express");
var controller = require("../components/user");
var apiAuth = require("../helper/apiAuthentication");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//User Registeration router
router.post("/v1/register", controller.userReg);

//User Login router
router.post("/v1/login", controller.userLogin);

//Get all User Emalil Id
router.get("/v1/emailList", apiAuth.validateToken, controller.emailList);

//View User router
router.post("/v1/view", apiAuth.validateToken, controller.viewUser);

module.exports = router;
