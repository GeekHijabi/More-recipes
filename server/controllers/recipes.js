import recipes from '../models';

module.exports = {
  create(req, res) {
    return recipes
      .create({
        recipeName: req.body.recipeName,
        description: req.body.description,
        name: req.body.name,
        recipeId: req.body.recipeId,
        reviews: req.body.reviews
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};
