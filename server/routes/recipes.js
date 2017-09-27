import express from 'express';
import recipeController from '../controllers/recipes';

let router = express.Router();

router.get('/', recipeController.test)

export default router;