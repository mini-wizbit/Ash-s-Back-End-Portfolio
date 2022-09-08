const db = require("../db/connection.js");

exports.selectReviews = (query) => {
  // ONE QUERY ASH
  //if(query.query) but later on!
  let queryStr =
    "SELECT reviews.*, COUNT(comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id";
  return db.query(queryStr).then((results) => {
    console.log(results.rows);
    return results.rows;
  });
};

exports.selectReviewsById = (review_id) => {
  if (review_id > 0) {
    return db
      .query(
        `SELECT reviews.*, COUNT(comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id`,
        [review_id] // review_id = 2
      )
      .then((results) => {
        if (results.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return results.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
