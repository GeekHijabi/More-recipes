use 'strict';
 
var recipesService = require('../services/recipes');
 
class RecipeController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }
 
    registerRoutes() {
        this.router.get('/pl', this.getrecipes.bind(this));
        this.router.get('/recipes/:id', this.getSingleRecipe.bind(this));
        this.router.post('/recipes', this.postRecipe.bind(this));
        this.router.put('/recipes/:id', this.putRecipe.bind(this));
        this.router.delete('/recipes/:id', this.deleteRecipe.bind(this));
    }
 
    getrecipes(req, res) {
        var recipes = recipesService.getrecipes();
        res.send(recipes);
    }
 
    getSingleRecipe(req, res) {
        var id = req.params.id;
        var Recipe = recipesService.getSingleRecipe(id);
 
        if (!Recipe) {
            res.sendStatus(404);
        } else {
            res.send(Recipe);
        }
    }
 
    putRecipe(req, res) {
        var id = parseInt(req.params.id, 10);
        var existingRecipe = recipesService.getSingleRecipe(id);
 
        if (!existingRecipe) {
            let RecipeInfo = req.body;
            RecipeInfo.id = id;
            if (recipesService.addRecipe(RecipeInfo)) {
                res.setHeader('Location', '/recipes/' + id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (recipesService.updateRecipe(id, req.body)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }
 
    postRecipe(req, res) {
        var RecipeInfo = req.body;
 
        if (recipesService.addRecipe(RecipeInfo)) {
            res.setHeader('Location', '/recipes/' + RecipeInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
}
 
module.exports = recipesController;