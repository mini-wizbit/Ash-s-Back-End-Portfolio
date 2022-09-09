const db = require("../db/connection.js");

exports.selectCommentsById = (review_id) => {
  const id = review_id.review_id;
  return db
    .query(`SELECT * FROM comments WHERE review_id = $1`, [id])
    .then((results) => {
      console.log(results.rows);
      return results.rows;
    });
};
