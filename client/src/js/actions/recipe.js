import axios from 'axios';
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
  VIEW_RECIPE_SUCCESS,
  VIEW_RECIPE_FAILURE,
  RECIPE_UPVOTE_SUCCESS,
  RECIPE_UPVOTE_FAILURE,
  RECIPE_DOWNVOTE_SUCCESS,
  RECIPE_DOWNVOTE_FAILURE,
  RECIPE_FAVORITE_SUCCESS,
  RECIPE_FAVORITE_FAILURE,
  RECIPE_REVIEW_SUCCESS,
  RECIPE_REVIEW_FAILURE,
  GET_RECIPE_REVIEW_SUCCESS,
  GET_RECIPE_REVIEW_FAILURE
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
export const reviewRecipeSuccess = recipeReview => ({
  type: RECIPE_REVIEW_SUCCESS,
  recipeReview
});
export const reviewRecipeFailure = Error => ({
  type: RECIPE_REVIEW_FAILURE,
  Error
});
export const getRecipeReviewSuccess = id => ({
  type: GET_RECIPE_REVIEW_SUCCESS,
  recipeId: id,
});

export const getRecipeReviewFailure = error => ({
  type: GET_RECIPE_REVIEW_FAILURE,
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
    }).catch((err) => {
      if (err && err.data) {
        dispatch(createRecipeFailure(err.data.error));
      }
    });
    return request;
  };

/**
 * Action for getRecipe
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

  /**
 * Action for getMyRecipe
 *
 * @returns {promise} request
 * @param {object} options
 */
export const apiGetMyRecipe = () =>
  function action(dispatch) {
    dispatch(getMyRecipe());
    const request = axios({
      method: 'GET',
      url: '/api/v1/recipes/myrecipes'
    });
    request.then((response) => {
      dispatch(getMyRecipeSuccess(response.data));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(getMyRecipeFailure(err.data.error));
      }
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
    }).catch((err) => {
      if (err && err.data) {
        dispatch(deleteRecipeFailure(err.data.error));
      }
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
      method: 'PUT',
      url: `/api/v1/recipes/${recipeId}`
    });
    request.then((response) => {
      dispatch(editRecipeSuccess(response.data.updatedRecipe));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(editRecipeFailure(err.data.error));
      }
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
    }).catch((err) => {
      if (err && err.data) {
        dispatch(viewRecipeFailure(err.data.error));
      }
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
    }).catch((err) => {
      if (err && err.data) {
        dispatch(upVoteRecipeFailure(err.data.error));
      }
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
    }).catch((err) => {
      if (err && err.data) {
        dispatch(downVoteRecipeFailure(err.data.error));
      }
    });
    return request;
  };
export const apifavoriteRecipe = id =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipe/${id}/favorite`
    });
    request.then(() => {
      dispatch(favoriteRecipeSuccess(id));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(favoriteRecipeFailure(err.data.error));
      }
    });
    return request;
  };

export const apiGetRecipeReview = id =>
  function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: `/api/v1/recipe/${id}/reviews`
    });
    request.then((response) => {
      console.log('reviews of single recipe response', response.data);
      dispatch(getRecipeReviewSuccess(response.data.recipeReview.reviews));
      // dispatch(getRecipeReviewSuccess(response.data.recipeReview.reviews));
    }).catch((error) => {
      if (error && error.data) {
        dispatch(getRecipeReviewFailure(error.data.error));
      }
    });
    return request;
  };

export const apiRecipeReview = (id, reviews) =>
  function action(dispatch) {
    console.log('review in action is', reviews);
    const request = axios({
      method: 'POST',
      url: `/api/v1/recipes/${id}/review`,
      data: {
        reviews
      }
    });
    request.then((response) => {
      console.log('recipeReview for state', response.data.recipeReview);
      dispatch(reviewRecipeSuccess(response.data.recipeReview));
    }).catch((error) => {
      if (error && error.data) {
        dispatch(reviewRecipeFailure(error.data.error));
      }
    });
    return request;
  };
