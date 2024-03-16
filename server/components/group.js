const model = require("../model/schema");
const validator = require("../helper/validation");

/*
Create Group Function This function basically create new groups
*/
exports.createGroup = async (req, res) => {
  try {
    var newGroup = new model.Group(req.body);
    //Performing validation on the input
    if (validator.notNull(newGroup.groupName)) {
      /*
            Split Json is used to store the user ease-split default it is 0 value */
      var splitJson = {};

      for (var user of newGroup.groupMembers) {
        //Validating the group Members exist in the DB
        var memberCheck = await validator.userValidation(user);
        if (!memberCheck) {
          var err = new Error("Invalid member id");
          err.status = 400;
          throw err;
        }

        //Adding user to the split Json  with 0
        splitJson[user] = 0;
      }

      /*
            Split Json will now contain an json with user email as the key and the split amount (currently 0) as the value
            */
      newGroup.split = splitJson;

      //Validating the group Owner exist in the DB
      var ownerCheck = await validator.userValidation(newGroup.groupOwner);
      if (!ownerCheck) {
        var err = new Error("Invalid owner id");
        err.status = 400;
        throw err;
      }

      var id = await model.Group.create(newGroup);
      res.status(200).json({
        status: "Success",
        message: "Group Creation Success",
        Id: id._id,
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
View Group function 
*/
exports.viewGroup = async (req, res) => {
  try {
    const group = await model.Group.findOne({
      _id: req.body.id,
    });
    if (!group || req.body.id == null) {
      var err = new Error("Invalid Group Id");
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      status: "Success",
      group: group,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};
