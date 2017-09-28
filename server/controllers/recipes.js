// import recipes from '../models/recipes';
class Recipe{

    // static test(req, res){
    //     return res.status(200).send({
    //         "message":"Hello World!"
    // });
    
    static addRecipe(req, res) {
        return recipes.create({
          userId:req.body.userId,
          recipeName: req.body.recipeName,
          ingredient: req.body.ingredient,
          description: req.body.description,
          crated_at: req.body.crated_at
        })
          .then(addRecipe => res.status(201).json({
            status: 'success',
            recipeName: addRecipe.recipeName,
            message: 'Recipe added successfully',
            data: { recipeId: addRecipe.id, userId: addRecipe.userId }
          }))
          .catch(error => res.status(400).json(error));
    }


    static modifyRecipe(req, res) {
        Recipes.findById(req.params.recipeId)
          .then((currentRecipe) => {
            const userId = req.body.userId;
            if (+currentRecipe.userId !== +userId) {
              return res.status(403).json({
                status: 'fail',
                message: 'You cannot modify this recipe'
              });
            }
            return Recipes
              .findOne({ where: {
                id: req.params.recipeId }
              })
              .then(recipe => recipe
                .update({
                  recipeName: req.body.recipeName || recipe.recipeName,
                  ingredient: req.body.ingredient || recipe.ingredient,
                  details: req.body.details || recipe.details
                })
                .then(() => {
                  Recipes.findById(req.params.recipeId).then(result => res.status(200).json({
                    status: 'success',
                    message: 'Recipe modified successfully!',
                    data: {
                      recipeName: result.recipeName,
                      ingredient: result.ingredient,
                      details: result.details,
                      userId: result.userId }
                  }));
                }));
          })
          .catch(error => res.status(400).json(error));
      }

    
    static deleteRecipe(req, res) {
        Recipes.findById(req.params.recipeId)
          .then((currentRecipe) => {
            const userId = req.body.userId;
            if (+currentRecipe.userId !== +userId) {
              return res.status(403).json({
                status: 'fail',
                message: 'You cannot delete this recipe'
              });
            }
            return Recipes
              .destroy({
                where: {
                  id: req.params.recipeId
                }
              })
              .then(() => {
                res.status(200).json({
                  status: 'success',
                  message: 'Recipe deleted successfully!'
                });
              });
          })
          .catch(error => res.status(404).json(error));
      }
    
}

export default Recipe;

