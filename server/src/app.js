require("dotenv").config();

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`app is running at ${app.get("port")}`);
});
