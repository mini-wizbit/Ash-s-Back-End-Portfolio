const db = require("../db/connection.js");

exports.selectReviewsById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then((reviewOfIdNumber) => {
      if (reviewOfIdNumber.rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else {
        return reviewOfIdNumber.rows[0];
      }
    });
};
