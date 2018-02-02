import axios from 'axios';
import {
  CREATE_RECIPE,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  GET_RECIPE,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAILURE,
  GET_FAVORITE_RECIPE_SUCCESS,
  GET_FAVORITE_RECIPE_FAILURE,
  GET_MY_RECIPE,
  GET_MY_RECIPE_SUCCESS,
  GET_MY_RECIPE_FAILURE,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
  EDIT_RECIPE,
  EDIT_RECIPE_SUCCESS,
  EDIT_RECIPE_FAILURE,
  VIEW_RECIPE_SUCCESS,
  VIEW_RECIPE_FAILURE,
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
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_FAILURE,
  RECIPE_REVIEW_SUCCESS,
  RECIPE_REVIEW_FAILURE,
  DELETE_RECIPE_REVIEW_SUCCESS,
  DELETE_RECIPE_REVIEW_FAILURE,
  SEARCH_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE,
  GET_SEARCH_ITEM
} from '../constants';

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
  type: GET_RECIPE,
});

export const getRecipeSuccess = recipes => ({
  type: GET_RECIPE_SUCCESS,
  recipes
});

export const getFavoriteRecipeSuccess = recipes => ({
  type: GET_FAVORITE_RECIPE_SUCCESS,
  recipes
});

export const getFavoriteRecipeFailure = recipes => ({
  type: GET_FAVORITE_RECIPE_FAILURE,
  recipes
});

export const getRecipeFailure = error => ({
  type: GET_RECIPE_FAILURE,
  error
});

export const getMyRecipe = () => ({
  type: GET_MY_RECIPE
});

export const getMyRecipeSuccess = myRecipes => ({
  type: GET_MY_RECIPE_SUCCESS,
  myRecipes
});

export const getMyRecipeFailure = error => ({
  type: GET_MY_RECIPE_FAILURE,
  error
});

export const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  recipeId: id
});

export const deleteRecipeFailure = error => ({
  type: DELETE_RECIPE_FAILURE,
  error
});

export const editRecipe = () => ({
  type: EDIT_RECIPE,
});

export const editRecipeSuccess = recipe => ({
  type: EDIT_RECIPE_SUCCESS,
  recipe
});

export const editRecipeFailure = error => ({
  type: EDIT_RECIPE_FAILURE,
  error
});

export const viewRecipeSuccess = recipe => ({
  type: VIEW_RECIPE_SUCCESS,
  recipeDetail: recipe
});

export const viewRecipeFailure = error => ({
  type: VIEW_RECIPE_FAILURE,
  error
});

export const upVoteRecipeSuccess = id => ({
  type: RECIPE_UPVOTE_SUCCESS,
  recipeId: id
});

export const upVoteRecipeFailure = error => ({
  type: RECIPE_UPVOTE_FAILURE,
  error
});

export const downVoteRecipeSuccess = id => ({
  type: RECIPE_DOWNVOTE_SUCCESS,
  recipeId: id
});

export const downVoteRecipeFailure = error => ({
  type: RECIPE_DOWNVOTE_FAILURE,
  error
});

export const favoriteRecipeSuccess = id => ({
  type: RECIPE_FAVORITE_SUCCESS,
  recipeId: id
});

export const favoriteRecipeFailure = error => ({
  type: RECIPE_FAVORITE_FAILURE,
  error
});

export const getfavoriteRecipeSuccess = favoriteRecipes => ({
  type: GET_RECIPE_FAVORITE_SUCCESS,
  favoriteRecipes
});

export const getfavoriteRecipeFailure = error => ({
  type: GET_RECIPE_FAVORITE_FAILURE,
  error
});

export const getAllFavoriteRecipeSuccess = favRecipes => ({
  type: GET_ALL_FAVORITE_RECIPE_SUCCESS,
  favRecipes
});

export const getAllFavoriteRecipeFailure = error => ({
  type: GET_ALL_FAVORITE_RECIPE_FAILURE,
  error
});

export const deleteFavoriteRecipeSuccess = id => ({
  type: DELETE_FAVORITE_RECIPE_SUCCESS,
  deletedFavoriteId: id
});

export const deleteFavoriteRecipeFailure = error => ({
  type: DELETE_FAVORITE_RECIPE_FAILURE,
  error
});

export const reviewRecipeSuccess = recipeReview => ({
  type: RECIPE_REVIEW_SUCCESS,
  recipeReview
});

export const reviewRecipeFailure = error => ({
  type: RECIPE_REVIEW_FAILURE,
  error
});

export const deleteRecipeReviewSuccess = id => ({
  type: DELETE_RECIPE_REVIEW_SUCCESS,
  deletedReviewId: id
});

export const deleteRecipeReviewFailure = error => ({
  type: DELETE_RECIPE_REVIEW_FAILURE,
  error
});

export const searchRecipeSuccess = searchRecipeName => ({
  type: SEARCH_RECIPE_SUCCESS,
  searchRecipeName
});

export const searchRecipeFailure = error => ({
  type: SEARCH_RECIPE_FAILURE,
  error
});

  /**
 * Action for createRecipe
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
    }).catch(() => {
      dispatch(createRecipeFailure('unable to create recipe'));
    });
    return request;
  };

/**
 * Action for getRecipe
 *
 * @returns {promise} request
 * @param {object} page
 * @param {object} limit
 * @param {object} sort
 */
export const apiGetRecipe = (page, limit, sort) =>
  function action(dispatch) {
    page = page || 1;
    dispatch(getRecipe());
    const request = axios({
      params: {
        limit,
        sort
      },
      method: 'GET',
      url: `/api/v1/recipes?page=${page}`
    });

    request.then((response) => {
      const {
        allRecipes, pageSize, pageCount, totalCount
      } = response.data;
      const paginated = {
        pageCount, pageSize, allRecipes, page, totalCount
      };
      dispatch(getRecipeSuccess(paginated));
    }).catch(() => {
      dispatch(getRecipeFailure('unable to get recipe'));
    });
    return request;
  };

  /**
 * Action for getMyRecipe
 *
 * @returns {promise} request
 * @param {object} page
 */
export const apiGetMyRecipe = page =>
  function action(dispatch) {
    dispatch(getMyRecipe());
    const request = axios({
      method: 'GET',
      url: `/api/v1/myrecipes?page=${page}`
    });
    request.then((response) => {
      const {
        allMyRecipes, pageSize, pageCount
      } = response.data;
      const paginated = {
        pageCount, pageSize, allMyRecipes, page
      };
      dispatch(getMyRecipeSuccess(paginated));
    }).catch(() => {
      dispatch(getMyRecipeFailure('unable to get user recipe'));
    });
    return request;
  };

/**
 * Action for deleteRecipe
 *
 * @returns {promise} request
 * @param {integer} id
 */
export const apiDeleteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'DELETE',
      url: `/api/v1/recipes/${id}`
    });
    request.then(() => {
      dispatch(deleteRecipeSuccess(id));
    }).catch(() => {
      dispatch(deleteRecipeFailure('recipe cannot be deleted at this time'));
    });
    return request;
  };

/**
 * Action for editRecipe
 *
 * @returns {promise} request
 * @param {object} recipeId
 */
export const apiEditRecipe = (recipeId, {
  recipeName, imageUrl, ingredients, description
}) =>
  function action(dispatch) {
    dispatch(editRecipe());
    const request = axios({
      data: {
        recipeName,
        imageUrl,
        ingredients,
        description
      },
      method: 'PATCH',
      url: `/api/v1/recipes/${recipeId}`
    });
    request.then((response) => {
      dispatch(editRecipeSuccess(response.data.updatedRecipe));
    }).catch(() => {
      dispatch(editRecipeFailure('recipe cannot be edited at this time'));
    });
    return request;
  };

  /**
   * Action to view single Recipe
   *
   * @param {object} recipeId
   * @returns {void}
   */
export const onViewRecipe = recipeId =>
  function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: `/api/v1/recipe/${recipeId}`
    });
    request.then((response) => {
      dispatch(viewRecipeSuccess(response.data));
    }).catch(() => {
      dispatch(viewRecipeFailure('unable to get recipe detail'));
    });
    return request;
  };

  /**
   * Action to upvote recipe
   *
   * @param {object} id
   * @returns {void}
   */
export const apiUpVoteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipe/${id}/upvote`
    });
    request.then(() => {
      dispatch(upVoteRecipeSuccess(id));
    }).catch(() => {
      dispatch(upVoteRecipeFailure('upvote not recorded'));
    });
    return request;
  };

  /**
   * Action to downvote recipe
   *
   * @param {object} id
   * @returns {void}
   */
export const apiDownVoteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipe/${id}/downvote`
    });
    request.then(() => {
      dispatch(downVoteRecipeSuccess(id));
    }).catch(() => {
      dispatch(downVoteRecipeFailure('downvote not recorded'));
    });
    return request;
  };

/**
 * Action for apifavoriteRecipe
 *
 * @returns {promise} request
 * @param {number} id
 */
export const apifavoriteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipe/${id}/favorite`
    });
    request.then(() => {
      dispatch(favoriteRecipeSuccess(id));
    }).catch(() => {
      dispatch(favoriteRecipeFailure('cannot create favorite yet'));
    });
    return request;
  };

/**
 * Action for getRecipe
 *
 * @returns {promise} request
 * @param {object} limit
 */
export const apiGetAllFavoriteRecipes = limit =>
  function action(dispatch) {
    const request = axios({
      params: {
        limit
      },
      method: 'GET',
      url: '/api/v1/favorites'
    });
    request.then((response) => {
      dispatch(getAllFavoriteRecipeSuccess(response.data.favRecipes));
    }).catch(() => {
      dispatch(getAllFavoriteRecipeFailure('unable to get favorite recipe'));
    });
    return request;
  };

  /**
 * Action for getRecipe
 *
 * @returns {promise} request
 * @param {object} id
 */
export const apiGetFavoriteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: `/api/v1/user/${id}/favorites`
    });
    request.then((response) => {
      dispatch(getfavoriteRecipeSuccess(response.data));
    }).catch(() => {
      dispatch(getfavoriteRecipeFailure('unable to get favorite recipe list'));
    });
    return request;
  };

/**
 * Action for deleteRecipe
 *
 * @returns {promise} request
 * @param {integer} id
 */
export const apiDeleteFavoriteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipe/${id}/favorite`
    });
    request.then(() => {
      dispatch(deleteFavoriteRecipeSuccess(id));
    }).catch(() => {
      dispatch(deleteFavoriteRecipeFailure('favorite recipe cannot be deleted at this time'));
    });
    return request;
  };

export const apiRecipeReview = (id, reviews) =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipes/${id}/review`,
      data: {
        reviews
      }
    });
    request.then((response) => {
      dispatch(reviewRecipeSuccess(response.data.review));
    }).catch(() => {
      dispatch(reviewRecipeFailure('reviews not created'));
    });
    return request;
  };

/**
 * Action for delete recipe review
 *
 * @returns {promise} request
 * @param {integer} id
 */
export const apiDeleteRecipeReview = id =>
  function action(dispatch) {
    const request = axios({
      method: 'DELETE',
      url: `/api/v1/recipe/${id}/review`
    });
    request.then(() => {
      dispatch(deleteRecipeReviewSuccess(id));
    }).catch(() => {
      dispatch(deleteRecipeReviewFailure('review cannot be deleted at this time'));
    });
    return request;
  };

  /**
 * Action for searchRecipe
 *
 * @returns {promise} request
 * @param {object} recipeName
 */
export const apiSearchRecipe = recipeName =>
  function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: '/api/v1/search',
      params: { search: recipeName }
    });
    request.then((response) => {
      dispatch(searchRecipeSuccess(response.data.searchFound));
    }).catch(() => {
      dispatch(searchRecipeFailure('search result not found'));
    });
    return request;
  };

  /**
 * Action for search Item
 *
 * @returns {promise} request
 * @param {object} recipeName
 */

export const searchItem = search => (dispatch) => {
  dispatch({
    type: GET_SEARCH_ITEM,
    searchItem: search
  });
};
