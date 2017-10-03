import recipes from '../models';

// const recipes = models.recipes;

module.exports = {
  create(req, res) {
    return recipes
      .create({
        recipeName: req.body.recipeName,
        description: req.body.description,
        Name: req.body.Name,
        recipeId: req.body.recipeId,
        reviews: req.body.reviews
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};

// const Recipe = require('../models').Recipe;
// const Reviews = require('../models').Review;

// module. exports = {
//   create(req, res) {
//     return Recipe 
//     .create({
//       recipeName: req.body.recipeName,
//       description: req.body.description,
//       Name: req.body.Name
//     })
//     .then(recipe => res.status(201).send(recipe))
//     .catch(error => res.status(400).send(error))
//   },

//   getRecipe(req, res) {
//       res.status(200).send(db.recipes);
//     }



//   deleteRecipe(req, res) {
//     for (let i = 0; i < db.recipes.length; i++) {
//       if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.Id, 10)){
//         db.recipes.splice(i, 1);
//         return res.status(200).json({
//           status: "success",
//           message: "Recipe Deleted"
//         })
//       }
//     }
//     return res.status(404).send({
//       message: 'Recipe Not found!'
//     });    
// }

// put(req, res) {
//   let id = req.params.Id;
//   if (!id){
//     return res.status(404).json({
//     message: 'Recipe Not found!'
//   });
//   const { userId, recipeName, description, Name } = req.body;
//   for (let i = 0; i < db.recipes.length; i++) {
//     if (db.recipes[i].id === parseInt(id, 10)){
//       db.recipes[i].userId = userId || db.recipes[i].userId;
//       db.recipes[i].Name = Name || db.recipes[i].Name;
//       db.recipes[i].recipeName = recipeName || db.recipes[i].recipeName;
//       db.recipes[i].description = description || db.recipes[i].description;
//       return res.status(200).send(db.recipes[i]);   
//     } 
//   }
//   return res.status(404).send('incomplete data')
// }

    
// }
// }
  
// export {Recipe};

