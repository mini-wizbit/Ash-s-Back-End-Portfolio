const db = require("../db/connection.js");

exports.selectReviews = (query) => {
  const columnName = Object.keys(query)[0];
  const whereValue = query[columnName];
  const validValues = [
    "social deduction",
    "euro game",
    "dexterity",
    "strategy",
    "hidden-roles",
    "push-your-luck",
    "roll-and-write",
    "deck-building",
    "engine-building",
  ];
  const validColumnNames = ["category"];
  let checkerQuery;
  let queryStr =
    "SELECT reviews.*, COUNT(comment_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id";

  if (columnName) {
    if (!validColumnNames.includes(columnName)) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    } else {
      queryStr += ` WHERE ${columnName} = $1`;
    }
  }

  queryStr += " GROUP BY reviews.review_id;";

  if (whereValue) {
    if (!validValues.includes(whereValue)) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
    return db
      .query(queryStr, [whereValue])
      .then((results) => {
        if (results.rows.length === 0) {
          checkerQuery = results.rows;
        } else {
          return results.rows;
        }
      })
      .then((results) => {
        if (results.length > 0) {
          return results;
        } else {
          return checkerQuery;
        }
      });
  } else {
    return db.query(queryStr).then((results) => {
      return results.rows;
    });
  }
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
