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
          .query("SELECT * FROM comments WHERE review_id = $1;", [id])
          .then((results) => {
            const numberOfComments = results.rows.length;
            reviewById.comment_count = numberOfComments;
            return reviewById;
          });
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
