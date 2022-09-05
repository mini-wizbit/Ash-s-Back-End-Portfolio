const db = require("../db/connection.js");

exports.selectUsers = () => {
  let queryStr = "SELECT * FROM users";
  return db.query(queryStr).then((results) => {
    return results.rows;
  });
};
