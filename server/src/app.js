const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
// app.use(cookieParser());

app.post("/login", (req, res) => {
  const id = req.body.user_id;
  const pw = req.body.user_pw;
  console.log("post/login", id, pw);
  res.json({ result: "ok", id: `${id}`, pw: `${pw}` });
});

dotenv.config();
app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`app is running at ${app.get("port")}`);
});
