import jwt from 'jsonwebtoken';
import db from '../models';

const { favoriterecipe } = db;

export default {

  create(req, res) {
    const token = req.headers['x-token'];
    const decodedToken = jwt.decode(token);
    return favoriterecipe
      .create({
        recipeId: req.params.recipeId,
        userId: decodedToken.currentUser.userId,
        category: req.body.category
      })
      .then(favorite => res.status(200).json({
        status: 'success',
        message: `You successfully choose recipe id ${req.params.recipeId} as your favorite recipes`,
        data: { userId: favorite.userId, recipeId: favorite.recipeId }
      }))
      .catch(error => res.status(400).json(error));
  },

  list(req, res) {
    return favoriterecipe
      .findAll({
        where: { userId: req.params.userId },
        include: [{
          model: db.recipes,
          attributes: ['recipeName', 'ingredient', 'details', 'votes'],
          include: [{
            model: db.user,
            attributes: ['fullName', 'updatedAt']
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
