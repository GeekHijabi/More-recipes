import express from 'express';
import {Recipe} from '../controllers/recipes';
import {review} from "../controllers/reviews";



const recipeController = new Recipe()
const reviewController = new review();

let router = express.Router();

router.post('/', recipeController.addRecipe)
router.get('/', recipeController.getRecipe)
router.delete('/:userId', recipeController.deleteRecipe)
router.post('/:Id/reviews', reviewController.add);


export default router;