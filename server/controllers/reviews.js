import db from '../models';

const { Recipe, Review } = db;

export default {
  create(req, res) {
    const { userDetail } = req.decoded;
    Recipe.find({
      where: { id: req.params.recipeId }
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          res.status(404).json({
            error: 'recipe not found'
          });
        }
      });
    return Review
      .create({
        recipeId: req.params.recipeId,
        userId: userDetail.id,
        review: req.body.review
      })
      .then(data => res.status(200).json({
        message: 'Your recipe has been reviewed',
        review: {
          userId: data.userId,
          recipeId: data.recipeId,
          review: data.review
        }
      }))
      .catch(error => res.status(400).json({
        error: error.message
      }));
  },

  list(req, res) {
    return Review
      .findAll({
        where: { recipeId: req.params.recipeId }
      })
      .then((review) => {
        if (review.length < 1) {
          res.status(404).json({
            error: 'No review found'
          });
        } else {
          res.status(200).json({ review });
        }
      })
      .catch(error => res.status(404).json(error.message));
  }
};
