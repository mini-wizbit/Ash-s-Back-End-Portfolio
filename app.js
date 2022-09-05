const express = require("express");
const { getCategories } = require("./Controllers/categories.controller");

const app = express();

app.get("/api/categories", getCategories);

app.use((err, req, res, next) => {
  console.log(err, "< FIX IT NOW"); // <- seems cute, but might DELETE later
  res.status(500).send({ msg: "Internal Error" });
});

module.exports = { app };
