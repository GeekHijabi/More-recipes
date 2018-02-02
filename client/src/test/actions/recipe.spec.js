import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dataMock from '../__mocks__/dataMock';
import mockLocalStorage from '../__mocks__/localStorageMock';
import {
  apiGetRecipe,
  apiCreateRecipe,
  apiGetMyRecipe,
  apiSearchRecipe,
  apiGetFavoriteRecipe,
  apiDownVoteRecipe,
  onViewRecipe,
  apiRecipeReview,
  apiUpVoteRecipe,
  apiEditRecipe,
  apiDeleteRecipe,
  apifavoriteRecipe,
  apiGetAllFavoriteRecipes,
  apiDeleteFavoriteRecipe,
  apiDeleteRecipeReview
} from '../../js/actions/recipe';
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
  SEARCH_RECIPE_SUCCESS,
  GET_RECIPE_FAVORITE_SUCCESS,
  RECIPE_UPVOTE_SUCCESS,
  RECIPE_DOWNVOTE_SUCCESS,
  VIEW_RECIPE_SUCCESS,
  RECIPE_REVIEW_SUCCESS,
  EDIT_RECIPE,
  EDIT_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  RECIPE_FAVORITE_SUCCESS,
  DELETE_RECIPE_FAILURE,
  VIEW_RECIPE_FAILURE,
  RECIPE_UPVOTE_FAILURE,
  RECIPE_DOWNVOTE_FAILURE,
  RECIPE_FAVORITE_FAILURE,
  GET_ALL_FAVORITE_RECIPE_SUCCESS,
  GET_ALL_FAVORITE_RECIPE_FAILURE,
  GET_RECIPE_FAVORITE_FAILURE,
  DELETE_FAVORITE_RECIPE_SUCCESS,
  DELETE_FAVORITE_RECIPE_FAILURE,
  RECIPE_REVIEW_FAILURE,
  DELETE_RECIPE_REVIEW_SUCCESS,
  SEARCH_RECIPE_FAILURE,
  DELETE_RECIPE_REVIEW_FAILURE
} from '../../js/constants';

const middlewares = [thunk];

window.localStorage = mockLocalStorage;

const mockStore = configureMockStore(middlewares);
describe('Recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('dispatches CREATE_RECIPE while trying to add a recipe ', (done) => {
    const { createRecipeData, createdRecipeData } = dataMock;
    moxios.stubRequest('/api/v1/recipes', {
      status: 201,
      response: createdRecipeData
    });
    const expectedActions = [
      {
        type: CREATE_RECIPE
      },
      {
        type: CREATE_RECIPE_SUCCESS,
        recipe: createdRecipeData
      }
    ];
    const store = mockStore({});
    store.dispatch(apiCreateRecipe(createRecipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(createdRecipeData.recipeName).toEqual('fish');
      });
    done();
  });

  it('dispatches CREATE_RECIPE_FAILURE when creating recipe fails', (done) => {
    const { createRecipeDataFailure } = dataMock;
    moxios.stubRequest('/api/v1/recipes', {
      status: 500,
      error: 'unable to create recipe'
    });
    const expectedActions = [
      {
        type: CREATE_RECIPE
      },
      {
        type: CREATE_RECIPE_FAILURE,
        error: 'unable to create recipe'
      }
    ];
    const store = mockStore({});
    store.dispatch(apiCreateRecipe(createRecipeDataFailure))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it(
    'dispatches GET_RECIPE when getting all recipes',
    async (done) => {
      const { getRecipes } = dataMock;
      moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
        status: 200,
        response: getRecipes
      });
      const expectedActions = [
        {
          type: GET_RECIPE
        },
        {
          type: GET_RECIPE_SUCCESS,
          recipes: getRecipes
        }
      ];
      const store = mockStore({});
      await store.dispatch(apiGetRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it('dispatches GET_RECIPE_FAILURE when getting recipe fails', (done) => {
    moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
      status: 500,
      error: 'unable to get recipe'
    });
    const expectedActions = [
      {
        type: GET_RECIPE
      },
      {
        type: GET_RECIPE_FAILURE,
        error: 'unable to get recipe'
      }
    ];
    const store = mockStore({});
    store.dispatch(apiGetRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it(
    'dispatches GET_MY_RECIPE when trying to get user recipe',
    async (done) => {
      const { getMyRecipes } = dataMock;
      moxios.stubRequest(`/api/v1/myrecipes?page=${1}`, {
        status: 200,
        response: getMyRecipes
      });
      const expectedActions = [
        {
          type: GET_MY_RECIPE
        },
        {
          type: GET_MY_RECIPE_SUCCESS,
          myRecipes: getMyRecipes
        }
      ];
      const store = mockStore({});
      await store.dispatch(apiGetMyRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );


  it(
    'dispatches GET_MY_RECIPE_FAILURE when getting user recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/myrecipes?page=${1}`, {
        status: 500,
        error: 'unable to get recipe'
      });
      const expectedActions = [
        {
          type: GET_MY_RECIPE
        },
        {
          type: GET_MY_RECIPE_FAILURE,
          error: 'unable to get user recipe'
        }
      ];
      const store = mockStore({});
      store.dispatch(apiGetMyRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches DELETE_RECIPE while deleting recipe',
    async (done) => {
      const { deletedRecipe } = dataMock;
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 200,
        response: deletedRecipe
      });
      const expectedActions = [{
        type: DELETE_RECIPE_SUCCESS,
        recipeId: 1
      }];
      const store = mockStore({});
      await store.dispatch(apiDeleteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches DELETE_RECIPE_FAILURE when deleting recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 500,
        error: 'recipe cannot be deleted at this time'
      });
      const expectedActions = [{
        type: DELETE_RECIPE_FAILURE,
        error: 'recipe cannot be deleted at this time'
      }];
      const store = mockStore({});
      store.dispatch(apiDeleteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatchws EDIT_RECIPE when trying to edit recipe',
    async (done) => {
      const { editedRecipeData, editedRecipeResponse } = dataMock;
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 200,
        response: editedRecipeResponse
      });
      const expectedActions = [
        {
          type: EDIT_RECIPE
        },
        {
          type: EDIT_RECIPE_SUCCESS,
          recipe: editedRecipeResponse.updatedRecipe
        }
      ];
      const store = mockStore({});
      await store.dispatch(apiEditRecipe(1, editedRecipeData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches EDIT_RECIPE_FAILURE when trying to edit recipe',
    (done) => {
      const { editedRecipeData } = dataMock;
      moxios.stubRequest(`/api/v1/recipes/${1}`, {
        status: 500,
        error: 'recipe cannot be edited at this time'
      });
      const expectedActions = [
        {
          type: EDIT_RECIPE
        },
        {
          type: EDIT_RECIPE_SUCCESS,
          error: 'recipe cannot be edited at this time'
        }
      ];
      const store = mockStore({});
      store.dispatch(apiEditRecipe(1, editedRecipeData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches VIEW_RECIPE when trying to view recipes',
    async (done) => {
      const { viewedRecipe } = dataMock;
      moxios.stubRequest(`/api/v1/recipe/${1}`, {
        status: 200,
        response: viewedRecipe
      });
      const expectedActions = [
        {
          type: VIEW_RECIPE_SUCCESS,
          recipeDetail: viewedRecipe
        }
      ];
      const store = mockStore({});
      await store.dispatch(onViewRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches VIEW_RECIPE_FAILURE when viewing a single recipe',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}`, {
        status: 500,
        error: 'unable to get recipe detail'
      });
      const expectedActions = [
        {
          type: VIEW_RECIPE_FAILURE,
          error: 'unable to get recipe detail'
        }
      ];
      const store = mockStore({});
      store.dispatch(onViewRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches UPVOTE_RECIPE when trying to upvote recipe',
    async (done) => {
      const { upvotedRecipe } = dataMock;
      moxios.stubRequest(`/api/v1/recipe/${1}/upvote`, {
        status: 200,
        response: upvotedRecipe
      });
      const expectedActions = [{
        type: RECIPE_UPVOTE_SUCCESS,
        recipeId: 1
      }];
      const store = mockStore({});
      await store.dispatch(apiUpVoteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches UPVOTE_RECIPE_FAILURE when upvote fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/upvote`, {
        status: 500,
        error: 'upvote not recorded'
      });
      const expectedActions = [{
        type: RECIPE_UPVOTE_FAILURE,
        recipeId: 1
      }];
      const store = mockStore({});
      store.dispatch(apiUpVoteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches RECIPE_DOWNVOTE when downvoting recipe',
    async (done) => {
      const { downvoteRecipe } = dataMock;
      moxios.stubRequest(`/api/v1/recipe/${1}/downvote`, {
        status: 200,
        response: downvoteRecipe
      });
      const expectedActions = [{
        type: RECIPE_DOWNVOTE_SUCCESS,
        recipeId: 1
      }];
      const store = mockStore({});
      await store.dispatch(apiDownVoteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates RECIPE_DOWNVOTE_FAILURE when downvoting recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/downvote`, {
        status: 500,
        error: 'downvote not recorded'
      });
      const expectedActions = [{
        type: RECIPE_DOWNVOTE_FAILURE,
        error: 'downvote not recorded'
      }];
      const store = mockStore({});
      store.dispatch(apiDownVoteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches RECIPE_FAVORITE_SUCCESS when adding recipe as favorite',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/favorite`, {
        status: 201,
      });
      const expectedActions = [
        {
          type: RECIPE_FAVORITE_SUCCESS,
          recipeId: 1,
          message: this
        }
      ];
      const store = mockStore({});
      store.dispatch(apifavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should RECIPE_FAVORITE_FAILURE when adding to recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/favorite`, {
        status: 500,
        error: 'cannot create favorite yet'
      });
      const expectedActions = [
        {
          type: RECIPE_FAVORITE_FAILURE,
          recipeId: 1,
          error: 'cannot create favorite yet'
        }
      ];
      const store = mockStore({});
      store.dispatch(apifavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches GET_ALL_FAVORITE_RECIPES when getting all favorite recipe',
    (done) => {
      const { getAllFavorite } = dataMock;
      moxios.stubRequest(`/api/v1/favorites?limit=${4}`, {
        status: 200,
        response: getAllFavorite
      });
      const expectedActions = [{
        type: GET_ALL_FAVORITE_RECIPE_SUCCESS,
        favRecipes: getAllFavorite.favRecipes
      }];
      const store = mockStore({});
      store.dispatch(apiGetAllFavoriteRecipes(4))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches GET_FAVORITE_RECIPES when getting all favorite recipes',
    (done) => {
      moxios.stubRequest(`/api/v1/favorites?limit=${4}`, {
        status: 500,
        error: 'unable to get favorite recipe list'
      });
      const expectedActions = [{
        type: GET_ALL_FAVORITE_RECIPE_FAILURE,
        error: 'unable to get favorite recipe list'
      }];
      const store = mockStore({});
      store.dispatch(apiGetAllFavoriteRecipes(4))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches GET_FAVORITE_RECIPES when getting user\'s favorite recipe',
    (done) => {
      const { favoriteRecipesResponse } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}/favorites`, {
        status: 200,
        response: favoriteRecipesResponse
      });
      const expectedActions = [{
        type: GET_RECIPE_FAVORITE_SUCCESS,
        favoriteRecipes: favoriteRecipesResponse
      }];
      const store = mockStore({});
      store.dispatch(apiGetFavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates GET_RECIPE_FAVORITE_FAILURE when getting user\'s favorite recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/user/${1}/favorites`, {
        status: 500,
        error: 'unable to get favorite recipe list'
      });
      const expectedActions = [{
        type: GET_RECIPE_FAVORITE_FAILURE,
        error: 'unable to get favorite recipe list'
      }];
      const store = mockStore({});
      store.dispatch(apiGetFavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches DELETE_FAVORITE_SUCCESS when deleting user\'s favorited recipe',
    async (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/favorite`, {
        status: 200,
        response: 1
      });
      const expectedActions = [{
        type: DELETE_FAVORITE_RECIPE_SUCCESS,
        deletedFavoriteId: 1
      }];
      const store = mockStore({});
      await store.dispatch(apiDeleteFavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches GET_FAVORITE_RECIPES when getting favorite recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/user/${1}/favorites`, {
        status: 500,
        error: 'unable to get favorite recipe list'
      });
      const expectedActions = [{
        type: GET_RECIPE_FAVORITE_FAILURE,
        error: 'unable to get favorite recipe list'
      }];
      const store = mockStore({});
      store.dispatch(apiGetFavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches DELETE_FAVORITE_RECIPE_FAILURE when deleting favorite recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/favorite`, {
        status: 500,
        error: 'favorite recipe cannot be deleted at this time'
      });
      const expectedActions = [{
        type: DELETE_FAVORITE_RECIPE_FAILURE,
        error: 'favorite recipe cannot be deleted at this time'
      }];
      const store = mockStore({});
      store.dispatch(apiDeleteFavoriteRecipe(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches ADD_REVIEW when adding a review',
    async (done) => {
      const { createReviewData } = dataMock;
      moxios.stubRequest(`/api/v1/recipes/${1}/review`, {
        status: 200,
        response: createReviewData
      });
      const expectedActions = [{
        type: RECIPE_REVIEW_SUCCESS,
        recipeReview: createReviewData.review
      }];
      const store = mockStore({});
      await store.dispatch(apiRecipeReview(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches ADD_REVIEW_FAILURE when adding review fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipes/${1}/review`, {
        status: 500,
        error: 'reviews not created'
      });
      const expectedActions = [{
        type: RECIPE_REVIEW_FAILURE,
        error: 'reviews not created'
      }];
      const store = mockStore({});
      store.dispatch(apiRecipeReview(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches DELETE_REVIEW_SUCCESS when user deletes a review',
    async (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/review`, {
        status: 200,
        response: 1
      });
      const expectedActions = [{
        type: DELETE_RECIPE_REVIEW_SUCCESS,
        deletedReviewId: 1
      }];
      const store = mockStore({});
      await store.dispatch(apiDeleteRecipeReview(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches DELETE_RECIPE_REVIEW_FAILURE when review deleting fails',
    (done) => {
      moxios.stubRequest(`/api/v1/recipe/${1}/review`, {
        status: 500,
        error: 'review cannot be deleted at this time'
      });
      const expectedActions = [{
        type: DELETE_RECIPE_REVIEW_FAILURE,
        error: 'review cannot be deleted at this time'
      }];
      const store = mockStore({});
      store.dispatch(apiDeleteRecipeReview(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches SEARCH_RECIPES when user searches for a recipe',
    (done) => {
      const { searchRecipes } = dataMock;
      moxios.stubRequest(`/api/v1/search?search=${'f'}`, {
        status: 200,
        response: searchRecipes
      });
      const expectedActions = [{
        type: SEARCH_RECIPE_SUCCESS,
        searchRecipeName: searchRecipes.searchFound
      }];
      const store = mockStore({});
      store.dispatch(apiSearchRecipe('f'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches SEARCH_RECIPES_FAILURE when search recipe fails',
    (done) => {
      moxios.stubRequest(`/api/v1/search?search=${'f'}`, {
        status: 500,
        error: 'search result not found'
      });
      const expectedActions = [{
        type: SEARCH_RECIPE_FAILURE,
        error: 'search result not found'
      }];
      const store = mockStore({});
      store.dispatch(apiSearchRecipe('f'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );
});
