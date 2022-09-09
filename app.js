const express = require("express");
const { getCategories } = require("./Controllers/categories.controller");

const { commentById } = require("./Controllers/comments.controller");
const {
  getReviews,
  getReviewById,
} = require("./Controllers/reviews.controller");

const { patchReview } = require("./Controllers/reviews.patch.controller");
const { getUsers } = require("./Controllers/users.controller");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewById);

app.patch("/api/reviews/:reviews_id", patchReview);

app.get("/api/reviews/:review_id/comments", commentById);

app.get("/api/users", getUsers);

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
  if (err.code === "22P02") {
    res.status(400).send({ status: 400, msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err, "< FIX IT NOW"); // <- seems cute, but might DELETE later
  res.status(500).send({ msg: "Internal Error" });
});

module.exports = app;
