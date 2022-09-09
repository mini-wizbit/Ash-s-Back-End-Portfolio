const { selectReviewsById, selectReviews } = require("../Model/review.model");

exports.getReviews = (req, res, next) => {
  const query = req.query;
  selectReviews(query)
    .then((reviewArr) => {
      console.log("back here?");
      res.status(200).send({ reviewArray: reviewArr });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const param = req.params;
  selectReviewsById(param.review_id)
    .then((reviewById) => {
      res.status(200).send({ game: reviewById });
    })
    .catch((err) => {
      next(err);
    });
};
