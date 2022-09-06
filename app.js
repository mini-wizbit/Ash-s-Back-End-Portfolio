const express = require("express");
const { getCategories } = require("./Controllers/categories.controller");
const { getReview } = require("./Controllers/reviews.controller");
const { postReview } = require("./Controllers/reviews.post.controller");

const app = express();

app.use(express.json()); // <- this boy right here caused all my problems and made them disappear too!

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReview);

app.post("/api/reviews/:reviews_id", postReview);

app.all("/*", (req, res) => {
  return res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err);
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err, "< FIX IT NOW"); // <- seems cute, but might DELETE later
  res.status(500).send({ msg: "Internal Error" });
});

module.exports = { app };
