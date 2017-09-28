import express from 'express';
import {Recipe} from '../controllers/recipes';
const recipeController = new Recipe()

let router = express.Router();

router.post('/', recipeController.addRecipe)
router.get('/', recipeController.getRecipe)
router.delete('/', recipeController.deleteRecipe)

export default router;