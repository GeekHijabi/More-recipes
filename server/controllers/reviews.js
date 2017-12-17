import db from '../models';

const { Recipe, Review } = db;

export default {
  create(req, res) {
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
        reviews: req.body.reviews
      })
      .then(data => res.status(200).json({
        message: 'Your recipe has been reviewed',
        review: data.reviews
      }))
      .catch(error => res.status(400).json({
        error: error.message
      }));
  },

  getSingleReview(req, res) {
    Review
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((singleReview) => {
        if (!singleReview) {
          res.status(404).json({
            error: 'No review found'
          });
        }
        return res.status(200).json({ singleReview });
      })
      .catch(error => res.status(404).json({
        error: error.message
      }));
  },
};
