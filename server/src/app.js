const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./middlewares/user");
const naver = require("./middlewares/naver");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.CONNECTION_STR, {})
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/naver", naver);
app.use("/api/user", user);

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () => {
  console.log(`app is running at ${app.get("port")}`);
});
