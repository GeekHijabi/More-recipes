import jwt from 'jsonwebtoken';
import db from '../models';

const { recipes } = db;


export default {
  create(req, res) {
    const token = req.headers['x-token'];
    const decodedToken = jwt.decode(token);
    return recipes
      .create({
        recipeName: req.body.recipeName,
        description: req.body.description,
        name: req.body.name || '',
        ingredients: req.body.ingredients,
        userId: decodedToken.currentUser.userId
      })
      .then(data => res.status(201).json({
        status: 'success',
        recipeName: data.recipeName,
        message: 'Recipe added successfully',
        data: { recipeId: data.id, userId: data.userId }
      }))
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  list(req, res) {
    if (req.query.order) {
      return recipes
        .findAll({
          order: [
            ['upvotes', 'DESC']
          ]
        }).then(sortedRecipes => res.status(200).send(sortedRecipes));
    }
    return recipes
      .findAll({ offset: req.query.next }).then((Recipes) => {
        if (!Recipes) {
          return res.status(200).send({
            Message: 'No recipes created!'
          });
        }
        return res.status(200).send(Recipes);
      });
  },


  update(req, res) {
    return recipes
      .find({
        where: {
          id: req.params.recipeId,
        },
      }).then((found) => {
        if (found) {
          return found
            .update({
              recipeName: req.body.recipeName || found.recipeName,
              description: req.body.description || found.description,
              ingredients: req.body.ingredients
            }, {
              where: {
                id: req.params.recipeId
              }
            })
            .then(updated => res.status(200).json({
              status: 'success',
              updated
            }));
        }
      }).catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return recipes
      .find({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((found) => {
        if (!found) {
          return res.status(404).send({
            message: 'recipe Not Found',
          });
        }
        return recipes
          .destroy({
            where: {
              id: req.params.recipeId,
            },
          })
          .then(() => res.status(200).send('Recipe deleted successfully'))
          .catch(error => res.status(400).send('Recipe cannot be deleted'));
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

};

