const { selectCommentsById } = require("../Model/comments.model");

exports.commentById = (req, res, next) => {
  const reviewIdObj = req.params;
  selectCommentsById(reviewIdObj)
    .then((commentsById) => {
      res.status(200).send({ commentsById });
    })
    .catch((err) => {
      next(err);
    });
};
