import db from '../models';

const { Recipe, Review, User } = db;

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
        userId: userDetail.id,
        recipeId: req.params.recipeId,
        reviews: req.body.reviews
      })
      .then(data => res.status(200).json({
        message: 'Your recipe has been reviewed',
        recipeReview: data
      }))
      .catch(error => res.status(400).json({
        error: error.message
      }));
  },

  getSingleReview(req, res) {
    Review
      .findAll({
        where: {
          recipeId: req.params.recipeId
        },
        include: [{
          model: User,
          attributes: ['userName', 'imageUrl']
        }]
      })
      .then((reviews) => {
        if (!reviews) {
          res.status(404).json({
            error: 'No review found'
          });
        }
        return res.status(200).json(reviews);
      })
      .catch(error => res.status(404).json({
        error: error.message
      }));
  },
};
