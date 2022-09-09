const db = require("../db/connection.js");

exports.selectCommentsById = (review_id) => {
  const id = review_id.review_id;
  let queryStr = "SELECT * FROM comments";
  if (id > 0) {
    queryStr += ` WHERE review_id = ${id};`;
  }
  return db.query(queryStr).then((results) => {
    return results.rows;
  });
};
