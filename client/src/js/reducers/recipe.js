import { cloneDeep } from 'lodash';
import initialState from '../utils/initialState';
import {
  CREATE_RECIPE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  GET_RECIPE,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAILURE,
  GET_MY_RECIPE,
  GET_MY_RECIPE_SUCCESS,
  GET_MY_RECIPE_FAILURE,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
  EDIT_RECIPE,
  EDIT_RECIPE_SUCCESS,
  EDIT_RECIPE_FAILURE,
  RECIPE_UPVOTE_SUCCESS,
  RECIPE_UPVOTE_FAILURE,
  RECIPE_DOWNVOTE_SUCCESS,
  RECIPE_DOWNVOTE_FAILURE,
  VIEW_RECIPE_SUCCESS,
  VIEW_RECIPE_FAILURE,
  RECIPE_REVIEW_SUCCESS,
  RECIPE_REVIEW_FAILURE,
  GET_RECIPE_REVIEW_SUCCESS,
  GET_RECIPE_REVIEW_FAILURE,
  SEARCH_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE } from '../constants';

export default (state = initialState, action) => {
  const newState = cloneDeep(state);
  const {
    type, recipe, recipeDetail, recipeReview,
    recipes, myRecipes, recipeId, error, searchRecipeName
  } = action;

  switch (type) {
    case CREATE_RECIPE:
      return {
        ...newState,
        isLoadingRecipe: true
      };
    case CREATE_RECIPE_SUCCESS:
      return {
        ...newState,
        recipes: [...newState.recipes, recipe],
        myRecipes: [...newState.myRecipes, recipe],
        isLoadingRecipe: false
      };
    case CREATE_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
        isLoadingRecipe: false
      };
    case GET_RECIPE:
      return {
        ...newState,
        isLoadingRecipe: true
      };
    case GET_RECIPE_SUCCESS:
      return {
        ...newState,
        recipes: recipes.allRecipes,
        isLoadingRecipe: false
      };
    case GET_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
        isLoadingRecipe: false
      };
    case GET_MY_RECIPE:
      return {
        ...newState,
        isLoadingRecipe: true
      };
    case GET_MY_RECIPE_SUCCESS:
      return {
        ...newState,
        myRecipes,
        isLoadingRecipe: false
      };
    case GET_MY_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
        isLoadingRecipe: false
      };
    case DELETE_RECIPE_SUCCESS:
      const newRecipes = newState.recipes
        .filter(recipeItem => recipeItem.id !== recipeId);
      const myNewRecipes = newState.myRecipes
        .filter(recipeItem => recipeItem.id !== recipeId);
      return {
        ...newState,
        recipes: newRecipes,
        myRecipes: myNewRecipes,
      };
    case DELETE_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error
      };
    case EDIT_RECIPE:
      return {
        ...newState,
        isLoadingRecipe: true
      };
    case EDIT_RECIPE_SUCCESS:
      const index = newState.myRecipes
        .findIndex(Recipe => Recipe.id === recipe.id);
      newState.myRecipes.splice(index, 1, recipe);
      return {
        ...newState,
        myRecipes: [...newState.myRecipes],
        isLoadingRecipe: false
      };
    case EDIT_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
        isLoadingRecipe: false
      };
    case VIEW_RECIPE_SUCCESS:
      return {
        ...newState,
        recipe: recipeDetail
      };
    case VIEW_RECIPE_FAILURE:
      return {
        errorMessage: error
      };
    case RECIPE_UPVOTE_SUCCESS:
      return {
        ...newState
      };
    case RECIPE_UPVOTE_FAILURE:
      return {
        errorMessage: error
      };
    case RECIPE_DOWNVOTE_SUCCESS:
      return {
        ...newState
      };
    case RECIPE_DOWNVOTE_FAILURE:
      return {
        errorMessage: error
      };
    case RECIPE_REVIEW_SUCCESS:
      newState.recipe.Reviews.unshift({ reviews: recipeReview.reviews });
      return {
        ...newState
      };
    case RECIPE_REVIEW_FAILURE:
      return {
        errorMessage: Error
      };
    case GET_RECIPE_REVIEW_SUCCESS:
      return {
        ...newState
      };
    case GET_RECIPE_REVIEW_FAILURE:
      return {
        errorMessage: error,
      };
    case SEARCH_RECIPE_SUCCESS:
      newState.SearchResults = searchRecipeName;
      return {
        ...newState
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
      };
    default:
      return newState;
  }
};
