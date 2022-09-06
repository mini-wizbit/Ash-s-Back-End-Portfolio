const { selectReviewPost } = require("../Model/reviews.post.model");

exports.postReview = (req, res, next) => {
  const review_id = req.params;
  const patchInfo = req.body;
  selectReviewPost(review_id, patchInfo)
    .then((updatedData) => {
      res.status(201).send({ updatedData });
    })
    .catch((err) => {
      next(err);
    });
};
