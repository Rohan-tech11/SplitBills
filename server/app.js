var dotenv = require("dotenv");
var express = require("express");
var apiAuth = require("./helper/apiAuthentication");
var cors = require("cors");

const path = require("path");
dotenv.config();

var usersRouter = require("./routes/userRouter");

var app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

const port = 3001;
app.listen(port, (err) => {
  console.log(`Server started in PORT | ${port}`);
});
