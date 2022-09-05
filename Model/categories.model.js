const db = require("../db/connection.js");

exports.selectCategories = () => {
  let queryStr = "SELECT * FROM categories";
  return db.query(queryStr).then((results) => {
    return results.rows;
  });
};
