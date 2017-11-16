import db from '../models';

const { favoriterecipe, recipes } = db;


export default {
  create(req, res) {
    const { userDetail } = req.decoded;

    recipes.find({
      where: {
        id: req.params.recipeId
      }
    }).then((foundRecipe) => {
      if (!foundRecipe) {
        favoriterecipe.findOne({
          where: {
            recipeId: req.params.recipeId,
            userDetail
          }
        }).then((foundFavorite) => {
          if (foundFavorite) {
            return res.status(400).json({
              message: 'Recipe already Favorited'
            });
          }
          return favoriterecipe
            .create({
              recipeId: req.params.recipeId,
              userDetail
            }).then(favorited => res.status(201).json({
              message: 'Recipe Favorited!',
              favorited
            }));
        });
      } else {
        return res.status(404).json({
          message: 'Recipe Not found!'
        });
      }
    });
  },

  list(req, res) {
    const { userDetail } = req.decoded;
    return favoriterecipe
      .findAll({
        where: {
          userDetail
        },
        include: [
          {
            model: recipes
          }
        ]
      }).then((Recipefound) => {
        if (Recipefound) {
          return res.status(200).json(found);
        }
        return res.status(404).json({
          message: 'You have no favorite recipe yet'
        });
      });
  }
};
