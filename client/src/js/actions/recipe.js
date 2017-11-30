import axios from 'axios';
import {
  CREATE_RECIPE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  GET_RECIPE,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAILURE } from '../constants';

export const createRecipe = () => ({
  type: CREATE_RECIPE
});

export const createRecipeSuccess = recipe => ({
  type: CREATE_RECIPE_SUCCESS,
  recipe
});

export const createRecipeFailure = error => ({
  type: CREATE_RECIPE_FAILURE,
  error
});

export const getRecipe = () => ({
  type: GET_RECIPE
});

export const getRecipeSuccess = recipes => ({
  type: GET_RECIPE_SUCCESS,
  recipes
});

export const getRecipeFailure = error => ({
  type: GET_RECIPE_FAILURE,
  error
});

  /**
 * Async action for createRecipe
 *
 * @returns {promise} request
 * @param {object} options
 */
export const apiCreateRecipe = ({
  recipeName, imageUrl, ingredients, description
}) =>
  function action(dispatch) {
    dispatch(createRecipe());
    const request = axios({
      data: {
        recipeName,
        imageUrl,
        ingredients,
        description
      },
      method: 'POST',
      url: '/api/v1/recipes'
    });
    request.then((response) => {
      dispatch(createRecipeSuccess(response.data));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(createRecipeFailure(err.data.error));
      }
    });
    return request;
  };

/**
 * Async action for getRecipe
 *
 * @returns {promise} request
 * @param {object} options
 */
export const apiGetRecipe = () =>
  function action(dispatch) {
    dispatch(getRecipe());
    const request = axios({
      params: {
        limit: 6
      },
      method: 'GET',
      url: '/api/v1/recipes'
    });
    request.then((response) => {
      dispatch(getRecipeSuccess(response.data));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(getRecipeFailure(err.data.error));
      }
    });
    return request;
  };
