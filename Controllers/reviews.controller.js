const { selectReviewsById } = require("../Model/review.model");

exports.getReview = (req, res, next) => {
  const param = req.params;
  selectReviewsById(param.review_id).then((reviewById) => {
    res.status(200).send({ game: reviewById });
  });
};
