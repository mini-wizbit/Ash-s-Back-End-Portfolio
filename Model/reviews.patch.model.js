const db = require("../db/connection.js");

exports.selectReviewPost = (review_id, patchInfo) => {
  const id = review_id.reviews_id;
  const toPatchThisKey = Object.keys(patchInfo)[0];
  const newValue = patchInfo[toPatchThisKey];
  const validReviewKeys = [
    "title",
    "review_body",
    "designer",
    "review_img_url",
    "votes",
    "category",
    "owner",
  ];
  if (!validReviewKeys.includes(toPatchThisKey)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
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
