const db = require("../db/connection.js");

exports.selectReviewByIdPost = (review_id, body) => {
  const author = body.userName;
  const text = body.bodyComment;
  const id = review_id.review_id;
  return db
    .query(
      `INSERT INTO comments (author, body, review_id)
      VALUES ($1, $2, $3)
      RETURNING author, body`,
      [author, text, id]
    )
    .then((results) => {
      if (!author && text) {
        Promise.reject({
          status: 400,
          msg: "Bad Request",
        });
      }
      return results.rows[0];
    });
};
