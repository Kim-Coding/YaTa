const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { User } = require("./models/User.js");

const app = express();
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  console.log("post/login", id, pw);
  res.json({ result: "ok", id: `${id}`, pw: `${pw}` });
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

dotenv.config();
app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`app is running at ${app.get("port")}`);
});
