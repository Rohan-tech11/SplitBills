var dotenv = require("dotenv");
var express = require("express");
var apiAuth = require("./helper/apiAuthentication");
var cors = require("cors");

const path = require("path");
dotenv.config();

var usersRouter = require("./routes/userRouter");
var groupRouter = require("./routes/groupRouter");

var app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/group", apiAuth.validateToken, groupRouter);

const port = 3001;
app.listen(port, (err) => {
  console.log(`Server started in PORT | ${port}`);
});
