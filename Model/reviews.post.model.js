const db = require("../db/connection.js");

exports.selectReviewPost = (review_id, patchInfo) => {
  const toPatchThisKey = Object.keys(patchInfo);
  const validReviewKeys = [
    "title",
    "review_body",
    "designer",
    "review_img_url",
    "votes",
    "category",
    "owner",
  ];
  return db
    .query(`SELECT * FROM reviews WHERE review_id = ${review_id.reviews_id}`)
    .then((reviewsIdData) => {
      if (reviewsIdData.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        let currentValue = reviewsIdData.rows[0][toPatchThisKey[0]];
        let queryStr = "UPDATE reviews";
        let newValue = 0;
        const createdQueryObj = {};
        if (
          typeof patchInfo[toPatchThisKey[0]] === "number" &&
          toPatchThisKey[0] === "votes"
        ) {
          newValue = currentValue += patchInfo[toPatchThisKey[0]];
        } else {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
        if (validReviewKeys.includes(toPatchThisKey[0])) {
          queryStr += ` SET ${toPatchThisKey[0]} = $1`;
          queryStr += ` WHERE review_id = ${review_id.reviews_id} RETURNING *;`;
        }
        createdQueryObj.string = queryStr;
        createdQueryObj.value = newValue;
        return createdQueryObj;
      }
    })
    .then((queryStr) => {
      return db.query(queryStr.string, [queryStr.value]);
    })
    .then((results) => {
      return results.rows[0];
    });
};
