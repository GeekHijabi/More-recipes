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
        userId: decodedToken.user.id
      })
      .then(data => res.status(201).json({
        status: 'success',
        recipeName: data.recipeName,
        message: 'Recipe added successfully',
        data: { recipeId: data.id, userId: data.userId }
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
      .then(result => res.status(200).send({
        page: (pageValue + 1),
        totalCount: result.count,
        pageCount: Math.ceil(result.count / limitValue),
        pageSize: parseInt(result.rows.length, 10),
        allRecipes: result.rows
      }))
      .catch(error => res.status(400).send({
        error: error.message
      }));
  },

  update(req, res) {
    const { user } = req.decoded;
    return recipes
      .find({
        where: {
          id: req.params.recipeId,
        },
      }).then((found) => {
        if (found && found.userId === user.id) {
          return found
            .update({
              recipeName: req.body.recipeName || found.recipeName,
              description: req.body.description || found.description,
              ingredients: req.body.ingredients || found.ingredients
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
        if (!found) {
          return res.status(404).send({ error: 'not recipe found' });
        }
        return res.status(400).send({ error: 'recipe does not belong to you' });
      }).catch(error => res.status(400).send({ error: error.message }));
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
          .then(() => res.status(200).json({
            message: 'Recipe deleted successfully'
          }))
          .catch(error => res.status(400).json({
            error: 'Recipe cannot be deleted by you',
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
    const { user } = req.decoded;
    recipes
      .findAll({
        where: {
          userId: user.id
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

