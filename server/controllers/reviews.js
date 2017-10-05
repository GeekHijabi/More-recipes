import db from '../models';

const { reviews } = db;

export default {

  create(req, res) {
    return reviews
      .create({
        recipeID: req.params.recipeId,
        reviews: req.body.reviews,
        recipeName: req.body.recipeName,
      })
      .then(data => res.status(200).json({
        status: 'success',
        message: 'Your recipe has been reviewed',
        data: { userId: data.userId, recipeId: data.recipeId }
      }))
      .catch(error => res.status(400).json(error));
  },

  list(req, res) {
    if (req.query.order) {
      return reviews
        .findAll({
          order: [
            ['upvotes', 'DESC']
          ]
        }).then(sortedReviews => res.status(200).send(sortedReviews));
    }
    return reviews
      .findAll({ offset: req.query.next }).then((Reviews) => {
        if (!Reviews) {
          return res.status(200).send({
            Message: 'No recipes created!'
          });
        }
        return res.status(200).send(Reviews);
      });
  },
};
