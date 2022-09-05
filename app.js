const express = require("express");

const app = express();

// custom error <- delete this comment later on
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.log(err, "< FIX IT NOW");
  res.status(500).send({ msg: "Internal Error" });
});

module.exports = { app };
