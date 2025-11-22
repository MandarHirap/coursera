const express = require("express");
const app = express();

app.post("/signup", (req, res) => {
  res.send("created user successfully");
});

app.post("/signin", (req, res) => {
  res.send("you are signed in");
});

app.post("/purchase", (req, res) => {
  res.send("buy a course");
});

app.post("/course", (req, res) => {
  res.send("purchased courses");
});
