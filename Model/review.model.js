const db = require("../db/connection.js");

exports.selectReviewsById = (review_id) => {
  if (review_id > 0) {
    return db
      .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
      .then((reviewOfIdNumber) => {
        if (reviewOfIdNumber.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        } else {
          return reviewOfIdNumber.rows[0];
        }
      })
      .then((reviewById) => {
        const id = reviewById.review_id;
        return db
          .query(
            "SELECT * FROM comments JOIN reviews ON reviews.review_id = comments.review_id WHERE reviews.review_id = 2;" // we now have a count
          )
          .then((results) => {
            console.log(results.rows, "< table in model");
            //return reviewById;
          });
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
