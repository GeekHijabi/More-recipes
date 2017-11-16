import jwt from 'jsonwebtoken';
import db from '../models';

const { recipes, reviews } = db;

export default {
  create(req, res) {
    const token = req.headers['x-token'];
    const decodedToken = jwt.decode(token);
    return recipes
      .create({
        recipeName: req.body.recipeName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        userId: decodedToken.userDetail.id
      })
      .then(newRecipe => res.status(201).json({
        status: 'success',
        recipeName: newRecipe.recipeName,
        description: newRecipe.description,
        ingredients: newRecipe.description,
        recipeId: newRecipe.id,
        userId: newRecipe.userId
      }))
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  },

  listAllRecipes(req, res) {
    const limitValue = req.query.limit || 5;
    const pageValue = (req.query.page - 1) || 0;
    const sort = req.query.sort === 'upvotes' ||
      req.query.sort === 'downvotes' ?
      req.query.sort : 'upvotes';
    const order = req.query.order === 'des' ?
      'DESC' : 'DESC';
    recipes
      .findAndCountAll({
        order: [
          [sort, order]
        ],
        limit: limitValue,
        offset: pageValue * limitValue
      })
      .then(recipeList => res.status(200).send({
        page: (pageValue + 1),
        totalCount: recipeList.count,
        pageCount: Math.ceil(recipeList.count / limitValue),
        pageSize: parseInt(recipeList.rows.length, 10),
        allRecipes: recipeList.rows
      }))
      .catch(() => res.status(422).send('Recipe Not Created yet'));
  },

  update(req, res) {
    const { userDetail } = req.decoded;
    return recipes
      .find({
        where: {
          id: req.params.recipeId,
        },
      }).then((Recipefound) => {
        if (Recipefound && Recipefound.userId === userDetail.id) {
          return Recipefound
            .update({
              recipeName: req.body.recipeName || Recipefound.recipeName,
              description: req.body.description || Recipefound.description,
              ingredients: req.body.ingredients || Recipefound.ingredients
            }, {
              where: {
                id: req.params.recipeId
              }
            })
            .then(updatedRecipe => res.status(200).json({
              status: 'success',
              updatedRecipe
            }));
        }
        if (!Recipefound) {
          return res.status(404).send({ error: 'Recipe not found' });
        }
        return res.status(401)
          .send({
            error: 'You cannot update a recipe that does not belong to you'
          });
      }).catch(error => res.status(400).send({ error: error.message }));
  },

  destroy(req, res) {
    return recipes
      .find({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((Recipefound) => {
        if (!Recipefound) {
          return res.status(404).send({
            error: 'recipe Not Found',
          });
        }
        return recipes
          .destroy({
            where: {
              id: req.params.recipeId,
            },
          })
          .then(() => res.status(200).json({
            message: 'Recipe deleted successfully'
          }))
          .catch(error => res.status(401).json({
            error: 'You cannot delete a recipe that does not belong to you',
            message: error.message
          }));
      })
      .catch(() => {
        res.status(500).json({
          error: 'oops! something went wrong!'
        });
      });
  },

  getUserRecipes(req, res) {
    const { userDetail } = req.decoded;
    recipes
      .findAll({
        where: {
          userId: userDetail.id
        },
        include: [{
          model: reviews,
          attributes: ['reviews']
        }]
      })
      .then((myRecipes) => {
        if (!myRecipes) {
          return res.status(404).json({
            error: 'No Recipe found'
          });
        }
        return res.status(200).json(myRecipes);
      })
      .catch(error => res.status(404).json({ error: error.message }));
  }

};

