const model = require("../model/schema");
const validator = require("../helper/validation");
const groupDAO = require("./group");

/*
Add Expense function
Expense id will be auto genereted in the db
*/

exports.addExpense = async (req, res) => {
  try {
    var expense = req.body;
    var group = await model.Group.findOne({
      _id: expense.groupId,
    });
    if (!group) {
      var err = new Error("Invalid Group Id");
      err.status = 400;
      throw err;
    }
    if (
      validator.notNull(expense.expenseName) &&
      validator.notNull(expense.expenseAmount) &&
      validator.notNull(expense.expenseOwner) &&
      validator.notNull(expense.expenseMembers) &&
      validator.notNull(expense.expenseDate)
    ) {
      var ownerValidation = await validator.groupUserValidation(
        expense.expenseOwner,
        expense.groupId
      );
      if (!ownerValidation) {
        var err = new Error("Please provide a valid group owner");
        err.status = 400;
        throw err;
      }
      for (var user of expense.expenseMembers) {
        var memberValidation = await validator.groupUserValidation(
          user,
          expense.groupId
        );
        if (!memberValidation) {
          var err = new Error(`the member ${user} not present in the group`);
          err.status = 400;
          throw err;
        }
      }
      expense.expensePerMember =
        expense.expenseAmount / expense.expenseMembers.length;
      expense.expenseCurrency = group.groupCurrency;
      var newExp = new model.Expense(expense);
      var newExpense = await model.Expense.create(newExp);

      //New expense is created now  updating the split values present in the group
      var update_response = await groupDAO.addSplit(
        expense.groupId,
        expense.expenseAmount,
        expense.expenseOwner,
        expense.expenseMembers
      );

      res.status(200).json({
        status: "Success",
        message: "New expenses added",
        Id: newExpense._id,
        splitUpdateResponse: update_response,
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
Edit Expense function

*/
exports.editExpense = async (req, res) => {
  try {
    var expense = req.body;
    var oldExpense = await model.Expense.findOne({
      _id: expense.id,
    });
    if (
      !oldExpense ||
      expense.id == null ||
      oldExpense.groupId != expense.groupId
    ) {
      var err = new Error("Invalid Expense Id");
      err.status = 400;
      throw err;
    }

    if (
      validator.notNull(expense.expenseName) &&
      validator.notNull(expense.expenseAmount) &&
      validator.notNull(expense.expenseOwner) &&
      validator.notNull(expense.expenseMembers) &&
      validator.notNull(expense.expenseDate)
    ) {
      var ownerValidation = await validator.groupUserValidation(
        expense.expenseOwner,
        expense.groupId
      );
      if (!ownerValidation) {
        var err = new Error("Please provide a valid group owner");
        err.status = 400;
        throw err;
      }
      for (var user of expense.expenseMembers) {
        var memberValidation = await validator.groupUserValidation(
          user,
          expense.groupId
        );
        if (!memberValidation) {
          var err = new Error("Please ensure the members exixt in the group");
          err.status = 400;
          throw err;
        }
      }

      var expenseUpdate = await model.Expense.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: {
            groupId: expense.groupId,
            expenseName: expense.expenseName,
            expenseDescription: expense.expenseDescription,
            expenseAmount: expense.expenseAmount,
            expenseOwner: expense.expenseOwner,
            expenseMembers: expense.expenseMembers,
            expensePerMember:
              expense.expenseAmount / expense.expenseMembers.length,
            expenseType: expense.expenseType,
            expenseDate: expense.expenseDate,
          },
        }
      );

      //Updating the group split values
      await groupDAO.clearSplit(
        oldExpense.groupId,
        oldExpense.expenseAmount,
        oldExpense.expenseOwner,
        oldExpense.expenseMembers
      );
      await groupDAO.addSplit(
        expense.groupId,
        expense.expenseAmount,
        expense.expenseOwner,
        expense.expenseMembers
      );

      res.status(200).json({
        status: "Success",
        message: "Expense Edited",
        response: expenseUpdate,
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
Delete Expense function

*/
exports.deleteExpense = async (req, res) => {
  try {
    var expense = await model.Expense.findOne({
      _id: req.body.id,
    });
    if (!expense) {
      var err = new Error("Invalid Expense Id");
      err.status = 400;
      throw err;
    }
    var deleteExp = await model.Expense.deleteOne({
      _id: req.body.id,
    });

    //Clearing split value for the deleted expense from group table
    await groupDAO.clearSplit(
      expense.groupId,
      expense.expenseAmount,
      expense.expenseOwner,
      expense.expenseMembers
    );

    res.status(200).json({
      status: "Success",
      message: "Expense is deleted",
      response: deleteExp,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
View Individual Expense

*/

exports.viewExpense = async (req, res) => {
  try {
    var expense = await model.Expense.findOne({
      _id: req.body.id,
    });
    if (expense.length == 0) {
      var err = new Error("No expense present for the Id");
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      status: "Success",
      expense: expense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
View Group Expense function

*/
exports.viewGroupExpense = async (req, res) => {
  try {
    var groupExpense = await model.Expense.find({
      groupId: req.body.id,
    }).sort({
      expenseDate: -1, //to get the newest first
    });
    if (groupExpense.length == 0) {
      var err = new Error("No expense present for the group");
      err.status = 400;
      throw err;
    }
    var totalAmount = 0;
    for (var expense of groupExpense) {
      totalAmount += expense["expenseAmount"];
    }
    res.status(200).json({
      status: "Success",
      expense: groupExpense,
      total: totalAmount,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
User Expense function

*/
exports.viewUserExpense = async (req, res) => {
  try {
    validator.notNull(req.body.user);
    var userExpense = await model.Expense.find({
      expenseMembers: req.body.user,
    }).sort({
      expenseDate: -1, //to get the newest first
    });
    if (userExpense.length == 0) {
      var err = new Error("No expense present for the user");
      err.status = 400;
      throw err;
    }
    var totalAmount = 0;
    for (var expense of userExpense) {
      totalAmount += expense["expensePerMember"];
    }
    res.status(200).json({
      status: "Success",
      expense: userExpense,
      total: totalAmount,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
Recent User Expenses function

*/
exports.recentUserExpenses = async (req, res) => {
  try {
    var recentExpense = await model.Expense.find({
      expenseMembers: req.body.user,
    })
      .sort({
        $natural: -1, //to get the newest first
      })
      .limit(5); //to get the top 5
    if (recentExpense.length == 0) {
      var err = new Error("No expense present for the user");
      err.status = 400;
      throw err;
    }
    res.status(200).json({
      status: "Success",
      expense: recentExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
Category wise group expense calculator function 

*/
exports.groupCategoryExpense = async (req, res) => {
  try {
    var categoryExpense = await model.Expense.aggregate([
      {
        $match: {
          groupId: req.body.id,
        },
      },
      {
        $group: {
          _id: "$expenseCategory",
          amount: {
            $sum: "$expenseAmount",
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      status: "success",
      data: categoryExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
Group Monthly Expense Function 

*/
exports.groupMonthlyExpense = async (req, res) => {
  try {
    var monthlyExpense = await model.Expense.aggregate([
      {
        $match: {
          groupId: req.body.id,
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$expenseDate",
            },
            year: {
              $year: "$expenseDate",
            },
          },
          amount: {
            $sum: "$expenseAmount",
          },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);
    res.status(200).json({
      status: "success",
      data: monthlyExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

new Date(new Date().setMonth(new Date().getMonth() - 5));
/*
Group Daily Expense Function 

*/
exports.groupDailyExpense = async (req, res) => {
  try {
    var dailyExpense = await model.Expense.aggregate([
      {
        $match: {
          groupId: req.body.id,
          expenseDate: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dayOfMonth: "$expenseDate",
            },
            month: {
              $month: "$expenseDate",
            },
            year: {
              $year: "$expenseDate",
            },
          },
          amount: {
            $sum: "$expenseAmount",
          },
        },
      },
      { $sort: { "_id.month": 1, "_id.date": 1 } },
    ]);
    res.status(200).json({
      status: "success",
      data: dailyExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
Category wise user expense calculator function 

*/
exports.userCategoryExpense = async (req, res) => {
  try {
    var categoryExpense = await model.Expense.aggregate([
      {
        $match: {
          expenseMembers: req.body.user,
        },
      },
      {
        $group: {
          _id: "$expenseCategory",
          amount: {
            $sum: "$expensePerMember",
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      status: "success",
      data: categoryExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
User Monthly Expense Function 

*/
exports.userMonthlyExpense = async (req, res) => {
  try {
    var monthlyExpense = await model.Expense.aggregate([
      {
        $match: {
          expenseMembers: req.body.user,
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$expenseDate",
            },
            year: {
              $year: "$expenseDate",
            },
          },
          amount: {
            $sum: "$expensePerMember",
          },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);
    res.status(200).json({
      status: "success",
      data: monthlyExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

/*
User Daily Expense Function 

*/
exports.userDailyExpense = async (req, res) => {
  try {
    var dailyExpense = await model.Expense.aggregate([
      {
        $match: {
          expenseMembers: req.body.user,
          expenseDate: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dayOfMonth: "$expenseDate",
            },
            month: {
              $month: "$expenseDate",
            },
            year: {
              $year: "$expenseDate",
            },
          },
          amount: {
            $sum: "$expenseAmount",
          },
        },
      },
      { $sort: { "_id.month": 1, "_id.date": 1 } },
    ]);
    res.status(200).json({
      status: "success",
      data: dailyExpense,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};
