const db = require("../db/connection.js");

exports.selectReviewPost = (review_id, patchInfo) => {
  const id = review_id.reviews_id;
  const toPatchThisKey = Object.keys(patchInfo)[0];
  const newValue = patchInfo[toPatchThisKey];

  let update = "";
  if (typeof newValue === "number") {
    update = `${toPatchThisKey} + $1`;
  } else {
    update = "$1";
  }
  return db
    .query(
      `UPDATE reviews SET ${toPatchThisKey} = ${update} WHERE review_id = $2 RETURNING *`,
      [newValue, id]
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return results.rows[0];
    });
};
