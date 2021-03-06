import db from '../models';

const { Recipe, Review, User } = db;

export default {
  createReview(req, res) {
    const { id } = req.decoded;
    Recipe.find({
      where: { id: req.params.recipeId }
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({
            error: 'recipe not found'
          });
        }
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
            User.findOne({
              where: { id: review.userId }
            }).then((reviewer) => {
              review.User = {
                userName: reviewer.userName,
                imageUrl: reviewer.imageUrl
              };
              res.status(200).json({
                message: 'Your recipe has been reviewed',
                review
              });
            });
          });
      })
      .catch(error => res.status(500).json({
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
      .catch(error => res.status(500).json({
        error: error.message
      }));
  },

  destroySingleReview(req, res) {
    const { id } = req.decoded;
    return Review
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((Reviewfound) => {
        if (!Reviewfound) {
          return res.status(404).send({
            error: 'Review not found',
          });
        }
        if (Reviewfound.userId === id) {
          return Reviewfound
            .destroy({
              Reviewfound
            })
            .then(() => res.status(200).json({
              message: 'Review deleted successfully'
            }));
        }
        return res.status(403).send({
          error: 'You are not authorized to perform this action',
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'oops! something went wrong!'
        });
      });
  },
};
