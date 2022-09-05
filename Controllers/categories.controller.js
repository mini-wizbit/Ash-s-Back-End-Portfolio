const { selectCategories } = require("../Model/categories.model");

exports.getCategories = (req, res, next) => {
  selectCategories("this")
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};
