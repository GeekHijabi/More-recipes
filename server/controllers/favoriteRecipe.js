import db from '../models';

const { Favorite, Recipe } = db;

export default {
  create(req, res) {
    const { userDetail } = req.decoded;
    Favorite.findOne(({
      where: {
        $and: [
          {
            recipeId: req.params.recipeId
          },
          { userId: userDetail.id }
        ]
      },
    }))
      .then((foundRecipe) => {
        if (!foundRecipe) {
          Favorite
            .create({
              recipeId: req.params.recipeId,
              userId: userDetail.id
            });
          return res.status(201).json({
            message: 'Recipe favorited'
          });
        }
        Favorite.destroy({
          where: {
            $and: [
              {
                recipeId: req.params.recipeId
              },
              { userId: userDetail.id }
            ]
          }
        });
        return res.status(409).json({
          error: 'Recipe unfavorited'
        });
      }).catch(() => {
        res.status(500).send({
          error: 'oops! something went wrong'
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
          error: 'You have no favorite recipe yet'
        });
      });
  }
};
