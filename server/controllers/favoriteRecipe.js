import db from '../models';

const { favoriteRecipe } = db;

export default {

  create(req, res) {
    const { user } = req.decoded;
    return favoriteRecipe
      .create({
        recipeId: req.params.recipeId,
        userId: user.id,
      })
      .then(favorite => res.status(200).json({
        status: 'success',
        message: `You successfully choose recipe id ${req.params.recipeId} as your favorite recipes`,
        data: { userId: favorite.userId, recipeId: favorite.recipeId }
      }))
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  list(req, res) {
    return favoriteRecipe
      .findAll({
        where: { userId: req.params.userId },
        include: [{
          model: db.recipes,
          attributes: ['recipeName', 'ingredients', 'description'],
          include: [{
            model: db.user,
            attributes: ['userName', 'updatedAt']
          }]
        }],
      })
      .then((favoriterecipe) => {
        if (favoriterecipe.length < 1) {
          res.status(404).json({
            message: 'No favorite recipe found'
          });
        } else {
          res.status(200).json(favoriterecipe);
        }
      })
      .catch(error => res.status(404).json(error));
  }
};
