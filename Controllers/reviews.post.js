const { selectReviewByIdPost } = require("../Model/review.post.model");

exports.postReviewByIdComment = (req, res, next) => {
  selectReviewByIdPost().then(() => {
    console.log("back to post review comment controller");
  });
};
