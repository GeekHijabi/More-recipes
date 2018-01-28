import db from '../models';

const { Favorite, Recipe } = db;
const updateFavoriteCounts = (recipeId) => {
  Favorite
    .count({
      where: {
        recipeId
      }
    }).then((totalFavorite) => {
      Recipe.findOne({
        where: {
          id: recipeId
        }
      }).then((recipeFound) => {
        if (recipeFound) {
          recipeFound.updateAttributes({
            favoriteCount: totalFavorite
          });
        }
      });
    });
};

export default {
  create(req, res) {
    const { id } = req.decoded;
    Favorite.findOne(({
      where: {
        $and: [
          {
            recipeId: req.params.recipeId
          },
          { userId: id }
        ]
      },
    }))
      .then((foundRecipe) => {
        if (!foundRecipe) {
          Favorite
            .create({
              recipeId: req.params.recipeId,
              userId: id
            }).then(() => {
              updateFavoriteCounts(req.params.recipeId);
              return res.status(201).json({
                message: 'Recipe favorited'
              });
            });
        } else {
          Favorite.destroy({
            where: {
              $and: [
                {
                  recipeId: req.params.recipeId
                },
                { userId: id }
              ]
            }
          }).then(() => {
            updateFavoriteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'Recipe unfavorited'
            });
          });
        }
      }).catch(() => {
        res.status(500).send({
          error: 'oops! something went wrong'
        });
      });
  },

  list(req, res) {
    const { id } = req.decoded;
    return Favorite
      .findAll({
        where: {
          userId: id
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
