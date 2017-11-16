import db from '../models';

const { Favorite, Recipe } = db;

export default {
  create(req, res) {
    const { userDetail } = req.decoded;
    Recipe.find({
      where: { id: req.params.recipeId }
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
      });
    return Favorite
      .create({
        recipeId: req.params.recipeId,
        userId: userDetail.id
      })
      .then(favorited => res.status(201).json({
        message: 'Recipe Favorited!',
        favorited
      }))
      .catch(() => {
        res.status(500).send({
          message: 'oops! something went wrong'
        });
      });
  },

  list(req, res) {
    const { userDetail } = req.decoded;
    return Favorite
      .findAll({
        where: {
          userId: userDetail.id
        },
        include: [
          {
            model: Recipe
          }
        ]
      }).then((Recipefound) => {
        if (Recipefound) {
          return res.status(200).json(Recipefound);
        }
        return res.status(404).json({
          message: 'You have no favorite recipe yet'
        });
      });
  }
};
