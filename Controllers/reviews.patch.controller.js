const {
  selectReviewPost: selectReviewPatch,
} = require("../Model/reviews.patch.model");

exports.patchReview = (req, res, next) => {
  const review_id = req.params;
  const patchInfo = req.body;
  selectReviewPatch(review_id, patchInfo)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
