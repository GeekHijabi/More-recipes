import { cloneDeep } from 'lodash';
import initialState from '../utils/initialState';
import {
  CREATE_RECIPE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  GET_RECIPE,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAILURE } from '../constants';

export default (state = initialState, action) => {
  const newState = cloneDeep(state);
  const {
    type, recipe, recipes, error
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
    default:
      return newState;
  }
};
