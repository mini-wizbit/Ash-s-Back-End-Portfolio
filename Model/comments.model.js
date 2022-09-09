const db = require("../db/connection.js");

exports.selectCommentsById = (review_id) => {
  const id = review_id.review_id;
  let queryStr = "SELECT * FROM comments";
  if (id > 0) {
    queryStr += ` WHERE review_id = $1;`;
  }
  return db.query(queryStr, [id]).then((results) => {
    console.log(results.rows);
    if (results.rows.length === 0) {
      return db
        .query("SELECT * FROM reviews WHERE review_id = $1", [id])
        .then((reviewResult) => {
          if (reviewResult.rows.length > 0) {
            return results.rows;
          } else {
            return Promise.reject({ status: 404, msg: "Not Found" });
          }
        });
    }
    return results.rows;
  });
};
