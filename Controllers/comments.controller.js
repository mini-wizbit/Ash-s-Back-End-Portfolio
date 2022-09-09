const { selectCommentsById } = require("../Model/comments.model");
const { selectReviewsById } = require("../Model/review.model");

exports.commentById = (req, res, next) => {
  const reviewIdObj = req.params;
  Promise.all([
    selectReviewsById(reviewIdObj.review_id),
    selectCommentsById(reviewIdObj),
  ])
    .then(([, commentsById]) => {
      console.log("here in controller");
      console.log(commentsById);
      res.status(200).send({ commentsById });
    })
    .catch((err) => {
      next(err);
    });
};
