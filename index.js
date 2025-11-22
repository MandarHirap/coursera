const express = require("express");
const app = express();

app.post("/user/signup", function (req, res) {
  res.json("created user successfully");
});

app.post("/user/signin", function (req, res) {
  res.json("you are signed in");
});

app.get("/user/courses", function (req, res) {
  res.json("purchased courses");
});

app.post("/user/purchase", function (req, res) {
  res.json("buy a course here");
});

app.get("/user/purchases", function (req, res) {
  res.json("courses that u have bought");
});
app.listen(3000);
