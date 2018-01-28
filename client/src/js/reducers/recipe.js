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
  RECIPE_FAVORITE_SUCCESS,
  RECIPE_FAVORITE_FAILURE,
  GET_RECIPE_FAVORITE_SUCCESS,
  GET_RECIPE_FAVORITE_FAILURE,
  GET_ALL_FAVORITE_RECIPE_SUCCESS,
  GET_ALL_FAVORITE_RECIPE_FAILURE,
  VIEW_RECIPE_SUCCESS,
  VIEW_RECIPE_FAILURE,
  RECIPE_REVIEW_SUCCESS,
  RECIPE_REVIEW_FAILURE,
  DELETE_RECIPE_REVIEW_SUCCESS,
  DELETE_RECIPE_REVIEW_FAILURE,
  GET_RECIPE_REVIEW_SUCCESS,
  GET_RECIPE_REVIEW_FAILURE,
  SEARCH_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE,
  GET_SEARCH_ITEM } from '../constants';

export default (state = initialState, action) => {
  const newState = cloneDeep(state);
  const {
    type, recipe, recipeDetail, recipeReview,
    recipes, myRecipes, recipeId, error, searchRecipeName,
    favRecipes, favoriteRecipes, deletedReviewId, searchItem
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
        isLoadingRecipe: true
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
      newState.recipes = recipes.allRecipes;
      newState.pageCount = recipes.pageCount;
      newState.isLoadingRecipe = false;
      return {
        ...newState
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
      newState.myRecipes = myRecipes.allMyRecipes;
      newState.pageCount = myRecipes.pageCount;
      newState.isLoadingRecipe = false;
      return {
        ...newState
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
      newState.recipes = newRecipes;
      newState.myRecipes = myNewRecipes;
      return {
        ...newState
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
    case RECIPE_FAVORITE_SUCCESS:
      return {
        ...newState
      };
    case RECIPE_FAVORITE_FAILURE:
      return {
        errorMessage: error
      };
    case GET_RECIPE_FAVORITE_SUCCESS:
      return {
        ...newState,
        favorites: favoriteRecipes,
      };
    case GET_RECIPE_FAVORITE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
      };
    case GET_ALL_FAVORITE_RECIPE_SUCCESS:
      return {
        ...newState,
        favRecipes
      };
    case GET_ALL_FAVORITE_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error
      };
    case RECIPE_REVIEW_SUCCESS:
      newState.recipe.Reviews.unshift(recipeReview);
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
    case DELETE_RECIPE_REVIEW_SUCCESS:
      const newReview = newState.recipe.Reviews
        .filter(Review => Review.id !== deletedReviewId);
      newState.recipe.Reviews = newReview;
      return {
        ...newState
      };
    case DELETE_RECIPE_REVIEW_FAILURE:
      return {
        ...newState,
        errorMessage: error
      };
    case GET_RECIPE_REVIEW_FAILURE:
      return {
        errorMessage: error,
      };
    case SEARCH_RECIPE_SUCCESS:
      newState.SearchResults = searchRecipeName;
      // newState.pageCount = recipes.pageCount;
      return {
        ...newState
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...newState,
        errorMessage: error,
      };
    case GET_SEARCH_ITEM:
      console.log(searchItem, 'search item');
      return {
        ...newState,
        searchItem
      };
    default:
      return newState;
  }
};
