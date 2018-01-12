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

  destroySingleReview(req, res) {
    const { userDetail } = req.decoded;
    return Review
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((Reviewfound) => {
        if (Reviewfound && Reviewfound.userId === userDetail.id) {
          return Reviewfound
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() => res.status(200).json({
              message: 'Review deleted successfully'
            }));
        }
        if (!Reviewfound) {
          return res.status(404).send({
            error: 'Review not found',
          });
        }
        return res.status(401).send({
          error: 'You cannot delete a review that does not belong to you',
        });
      })
      .catch((error) => {
        res.status(500).json({
          // error: 'oops! something went wrong!'
          error: error.message
        });
      });
  },
};
