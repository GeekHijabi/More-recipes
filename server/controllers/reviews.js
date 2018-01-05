import db from '../models';

const { Recipe, Review, User } = db;

export default {
  create(req, res) {
    const { id, imageUrl, userName } = req.decoded.userDetail;
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
        userId: id,
        recipeId: req.params.recipeId,
        reviews: req.body.reviews,
      })
      .then((data) => {
        const review = data.get({
          plain: true
        });
        review.User = { userName, imageUrl };
        res.status(200).json({
          message: 'Your recipe has been reviewed',
          review
        });
      })
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
