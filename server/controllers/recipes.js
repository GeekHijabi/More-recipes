import moment from 'moment';
import db from '../models';

const {
  Recipe, Review, Favorite, User
} = db;

export default {
  create(req, res) {
    const { userDetail } = req.decoded;
    const { recipeName } = req.body;
    const { id } = userDetail;

    Recipe.findOne(({
      where: {
        $and: [
          {
            recipeName
          },
          { userId: id }
        ]
      },
    }))
      .then((RecipeFound) => {
        if (RecipeFound) {
          return res.status(409).json({
            error: 'You cannot create same recipe twice'
          });
        }
        return Recipe
          .create({
            recipeName: req.body.recipeName,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            preptime: req.body.preptime,
            servings: req.body.servings,
            userId: userDetail.id
          })
          .then(newRecipe => res.status(201).json({
            recipeName: newRecipe.recipeName,
            description: newRecipe.description,
            ingredients: newRecipe.ingredients,
            imageUrl: newRecipe.imageUrl,
            preptime: newRecipe.preptime,
            servings: newRecipe.servings,
            id: newRecipe.id,
            createdAt: moment().calendar(),
            userId: newRecipe.userId
          }));
      }).catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  listAllRecipes(req, res) {
    console.log('req', req.query);
    const limitValue = req.query.limit || 5;
    const pageValue = (req.query.page - 1) || 0;
    const sort = req.query.sort === 'upvotes' ||
      req.query.sort === 'downvotes' ?
      req.query.sort : 'upvotes';
    const order = req.query.order === 'des' ?
      'DESC' : 'ASC';
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
      }))
      .catch(() => res.status(422).json({ error: 'Recipe Not Created yet' }));
  },

  listAllFavoriteRecipes(req, res) {
    const limitValue = req.query.limit || 4;
    const sort = 'favoriteCount';
    const order = req.query.order === 'asc' ?
      'ASC' : 'DESC';
    Recipe
      .findAndCountAll({
        order: [
          [sort, order]
        ],
        limit: limitValue
      })
      .then(favoriteRecipeList => res.status(200).json({
        favRecipes: favoriteRecipeList.rows
      }))
      .catch(() => res.status(422).json({ error: 'Fav Recipe Not Created yet' }));
  },

  update(req, res) {
    const { userDetail } = req.decoded;
    return Recipe
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
              ingredients: req.body.ingredients || Recipefound.ingredients,
              imageUrl: req.body.imageUrl || Recipefound.imageUrl,
              preptime: req.body.preptime || Recipefound.preptime,
              servings: req.body.servings || Recipefound.servings,
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
      }).catch(() => res.status(400).json({ error: 'Recipe not found' }));
  },

  destroy(req, res) {
    const { userDetail } = req.decoded;
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
        },
      })
      .then((Recipefound) => {
        if (Recipefound && Recipefound.userId === userDetail.id) {
          return Recipefound
            .destroy({
              where: {
                id: req.params.recipeId,
              },
            })
            .then(() => res.status(200).json({
              message: 'Recipe deleted successfully'
            }));
        }
        if (!Recipefound) {
          return res.status(404).send({
            error: 'recipe Not Found',
          });
        }
        return res.status(401).send({
          error: 'You cannot delete a recipe that does not belong to you',
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'oops! something went wrong!'
        });
      });
  },

  getUserRecipes(req, res) {
    const { userDetail } = req.decoded;
    Recipe
      .findAll({
        where: {
          userId: userDetail.id
        },
        include: [
          {
            model: Review,
            attributes: ['reviews']
          }
        ]
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
  },

  getSingleRecipe(req, res) {
    Recipe
      .findOne({
        where: {
          id: req.params.recipeId
        },
        include: [
          {
            model: Review,
            include: [
              {
                model: User,
                attributes: ['userName', 'imageUrl']
              }
            ]
          },
          {
            model: Favorite
          }
        ]
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


  searchRecipe(req, res) {
    Recipe
      .findAll({
        where: {
          recipeName: {
            $ilike: `%${decodeURIComponent(req.query.search)}%`
          }
        }
      }).then(searchFound => res.status(200).json({ RecipeFound: searchFound }))
      .catch(error => res.status(404).json({ error: error.message }));
  },

};
