const { selectReviewByIdPost } = require("../Model/review.post.model");

exports.postReviewByIdComment = (req, res, next) => {
  const body = req.body;
  const review_id = req.params;
  selectReviewByIdPost(review_id, body)
    .then((addedComment) => {
      res.status(201).send({ addedComment });
    })
    .catch((err) => {
      next(err);
    });
};
