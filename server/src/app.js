const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersController = require("./controllers/user.controllers");
dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.CONNECTION_STR, {})
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

app.post("/login", usersController.createToken);
app.post("/register", usersController.createNewUser);

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`app is running at ${app.get("port")}`);
});
