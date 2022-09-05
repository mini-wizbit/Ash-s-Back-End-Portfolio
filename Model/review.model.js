const db = require("../db/connection.js");

exports.selectReviewsById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then((reviewOfIdNumber) => {
      return reviewOfIdNumber.rows[0];
    });
};
