import db from '../models';

const {
  Recipe, Review, Favorite, User
} = db;

export default {

  /**
   * function createRecipe
   * @param {any} req
   * @param {any} res
   * @returns {object} recipe
   */
  createRecipe(req, res) {
    const { id } = req.decoded;
    const {
      recipeName,
      description,
      imageUrl,
      ingredients,
      preptime,
      servings
    } = req.body;

    Recipe.findOne({
      where: {
        $and: [
          {
            recipeName
          },
          { userId: id }
        ]
      },
    })
      .then((recipeFound) => {
        if (recipeFound) {
          return res.status(409).json({
            error: 'You cannot create same recipe twice'
          });
        }
        return Recipe
          .create({
            recipeName,
            description,
            imageUrl,
            ingredients,
            preptime,
            servings,
            userId: id
          })
          .then(newRecipe =>
            res.status(201).json({
              recipeName: newRecipe.recipeName,
              description: newRecipe.description,
              ingredients: newRecipe.ingredients,
              imageUrl: newRecipe.imageUrl,
              preptime: newRecipe.preptime,
              servings: newRecipe.servings,
              id: newRecipe.id,
              userId: newRecipe.userId
            }));
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  /**
   * function listAllRecipes
   * @param {any} req
   * @param {any} res
   * @returns {array} all recipes
   */
  listAllRecipes(req, res) {
    const limitValue = req.query.limit || 6;
    const pageValue = (req.query.page - 1) || 0;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';
    Recipe
      .findAndCountAll({
        order: [
          [sort, order]
        ],
        limit: limitValue,
        offset: pageValue * limitValue
      })
      .then(recipeList => res.status(200).json({
        page: (pageValue + 1),
        totalCount: recipeList.count,
        pageCount: Math.ceil(recipeList.count / limitValue),
        pageSize: parseInt(recipeList.rows.length, 10),
        allRecipes: recipeList.rows
      }));
  },

  /**
   * function listAllFavoriteRecipes
   * @param {any} req
   * @param {any} res
   * @returns {array} favorite recipes created by user
   */
  listAllFavoriteRecipes(req, res) {
    const limitValue = req.query.limit || 3;
    const sort = 'favoriteCount';
    const order = req.query.order === 'asc' ?
      'ASC' : 'DESC';
    Recipe
      .findAndCountAll({
        where: {
          favoriteCount:
          { $gt: 0 }
        },
        order: [
          [sort, order]
        ],
        limit: limitValue
      })
      .then(favoriteRecipeList => res.status(200).json({
        favRecipes: favoriteRecipeList.rows
      }));
  },

  /**
   * function updateRecipe
   * @param {any} req
   * @param {any} res
   * @returns {object} updated recipe
   */
  updateRecipe(req, res) {
    const { id } = req.decoded;
    const {
      recipeName,
      description,
      ingredients,
      imageUrl,
      preptime,
      servings
    } = req.body;
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).send({ error: 'Recipe not found' });
        }
        if (recipeFound.userId === id) {
          recipeFound
            .update({
              recipeName: recipeName || recipeFound.recipeName,
              description: description || recipeFound.description,
              ingredients: ingredients || recipeFound.ingredients,
              imageUrl: imageUrl || recipeFound.imageUrl,
              preptime: preptime || recipeFound.preptime,
              servings: servings || recipeFound.servings,
            })
            .then(updatedRecipe => res.status(200).json({
              updatedRecipe
            }));
        } else {
          res.status(403)
            .send({
              error: 'You are not authorized to perform this action'
            });
        }
      }).catch(() => res.status(500).json({ error: 'Internal server error' }));
  },

  /**
   * function destroyRecipe
   * @param {any} req
   * @param {any} res
   * @returns {null} void
   */
  destroyRecipe(req, res) {
    const { id } = req.decoded;
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).send({
            error: 'Recipe not found',
          });
        }
        if (recipeFound.userId === id) {
          return recipeFound
            .destroy({ recipeFound })
            .then(() => res.status(200).json({
              message: 'Recipe deleted successfully'
            }));
        }
        return res.status(403).send({
          error: 'You are not authorized to perform this action',
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'oops! something went wrong!'
        });
      });
  },

  /**
   * function getUserRecipes
   * @param {any} req
   * @param {any} res
   * @returns {array} recipes
   */
  getUserRecipes(req, res) {
    const limitValue = req.query.limit || 6;
    const pageValue = (req.query.page - 1) || 0;
    const sort = req.query.sort ? req.query.sort : 'createdAt';
    const order = req.query.order ? req.query.order : 'DESC';
    const { id } = req.decoded;
    Recipe
      .findAndCountAll({
        where: {
          userId: id
        },
        order: [
          [sort, order]
        ],
        limit: limitValue,
        offset: pageValue * limitValue
      })
      .then(myRecipesList => res.status(200).json({
        page: (pageValue + 1),
        totalCount: myRecipesList.count,
        pageCount: Math.ceil(myRecipesList.count / limitValue),
        pageSize: parseInt(myRecipesList.rows.length, 10),
        allMyRecipes: myRecipesList.rows
      }));
  },


  /**
   * function getSingleRecipe
   * @param {any} req
   * @param {any} res
   * @returns {object} recipe created by user
   */
  getSingleRecipe(req, res) {
    Recipe
      .findOne({
        where: {
          id: req.params.recipeId,
        },
        include: [
          {
            model: Review,
            include: [
              {
                model: User,
                attributes: ['userName', 'imageUrl']
              }
            ],
          },
          {
            model: Favorite
          }
        ],
        order: [
          [Review, 'createdAt', 'desc']
        ],
      })
      .then((singleRecipe) => {
        if (!singleRecipe) {
          return res.status(404).json({
            error: 'No Recipe found'
          });
        }
        return res.status(200).json(singleRecipe);
      })
      .catch(error => res.status(404).json({ error: error.message }));
  },

  /**
   * function updateRecipeView
   * @param {any} req
   * @param {any} res
   * @returns {number} views of a single recipe
   */
  updateRecipeView(req, res) {
    const { id } = req.decoded;
    Recipe
      .findOne({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).json({
            error: 'No Recipe found'
          });
        }
        if (recipeFound.userId !== id) {
          recipeFound
            .update({ views: recipeFound.views + 1 });
        }
        return res.status(200).json({ views: recipeFound.views });
      })
      .catch(error => res.status(404).json({ error: error.message }));
  },

  /**
   * function searchRecipe
   * @param {any} req
   * @param {any} res
   * @returns {array} searched recipes
   */
  searchRecipe(req, res) {
    const limitValue = req.query.limit || 6;
    const pageValue = (req.query.page - 1) || 0;
    Recipe
      .findAll({
        where: {
          $or: [
            {
              recipeName: {
                $ilike: `%${decodeURIComponent(req.query.search)}%`
              }
            },
            {
              ingredients: {
                $ilike: `%${decodeURIComponent(req.query.search)}%`
              }
            }
          ]
        },
        limit: limitValue
      }).then(searchFound => res.status(200).json({
        page: (pageValue + 1),
        totalCount: searchFound.count,
        pageCount: Math.ceil(searchFound.count / limitValue),
        searchFound
      }))
      .catch(() => res.status(500).json({ error: 'internal server error' }));
  },
};
