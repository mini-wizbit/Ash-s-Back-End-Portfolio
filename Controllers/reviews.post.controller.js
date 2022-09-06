const { selectReviewPost } = require("../Model/reviews.post.model");

exports.postReview = (req, res, next) => {
  const newPostData = req.body;
  console.log(newPostData);
  selectReviewPost().then(() => {
    console.log("back to PostReview controller");
  });
};
