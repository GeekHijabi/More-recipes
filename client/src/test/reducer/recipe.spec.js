import expect from 'expect';
import recipe from '../../js/reducers/recipe';
import * as actions from '../../js/actions/recipe';
import initialState from '../../js/utils/initialState';
import dataMock from '../__mocks__/dataMock';
import { GET_SEARCH_ITEM } from '../../js/constants';

describe.only('Recipe reducer', () => {
  it(
    'should return isLoadingRecipe as true when CREATE_RECIPE is dispatched',
    () => {
      const action = actions.createRecipe();
      const newState = recipe(initialState, action);
      expect(newState.isLoadingRecipe).toEqual(true);
    }
  );

  it(
    'should return recipe data when CREATE_RECIPE_SUCCESS is dispatched',
    () => {
      const { createRecipeData } = dataMock;
      const action = actions.createRecipeSuccess(createRecipeData);
      const newState = recipe(initialState, action);
      expect(newState.recipes).toEqual([createRecipeData]);
    }
  );

  it(
    'should return CREATE_RECIPE_FAILURE when error occurs on creating recipe',
    () => {
      const error = 'Input an ingredient';
      const action = actions.createRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it(
    'should return isLoadingRecipe as true when GET_RECIPE is dispatched',
    () => {
      const action = actions.getRecipe();
      const newState = recipe(initialState, action);
      expect(newState.isLoadingRecipe).toEqual(true);
    }
  );

  it('should return all recipes when GET_RECIPE_SUCCESS is dispatched', () => {
    const { getRecipes } = dataMock;
    const action = actions.getRecipeSuccess(getRecipes);
    const newState = recipe(initialState, action);
    expect(newState.recipes).toEqual(getRecipes.allRecipes);
    expect(newState.pageCount).toBe(1);
  });

  it('should dispatch GET_RECIPE_FAILURE for error getting recipe', () => {
    const error = 'cannot get recipe';
    const action = actions.getRecipeFailure(error);
    const newState = recipe(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });

  it(
    'should return isLoadingRecipe as true when GET_MY_RECIPE is dispatched',
    () => {
      const action = actions.getMyRecipe();
      const newState = recipe(initialState, action);
      expect(newState.isLoadingRecipe).toEqual(true);
    }
  );

  it(
    'should return all recipes when GET_MY_RECIPE_SUCCESS is dispatched',
    () => {
      const { getMyRecipes } = dataMock;
      const action = actions.getMyRecipeSuccess(getMyRecipes);
      const newState = recipe(initialState, action);
      expect(newState.myRecipes).toEqual(getMyRecipes.allMyRecipes);
      expect(newState.pageCount).toBe(1);
    }
  );

  it(
    'should dispatch GET_MY_RECIPE_FAILURE for error getting user\'s recipe',
    () => {
      const error = 'cannot get recipe';
      const action = actions.getMyRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it(
    'should return isLoadingRecipe as true when EDIT_RECIPE is dispatched',
    () => {
      const action = actions.editRecipe();
      const newState = recipe(initialState, action);
      expect(newState.isLoadingRecipe).toEqual(true);
    }
  );

  it(
    'should return edited recipe when EDIT_RECIPE_SUCCESS is dispatched',
    () => {
      const { getMyRecipes, editedRecipe } = dataMock;
      const action = actions.editRecipeSuccess(editedRecipe);
      const state = {
        myRecipes: getMyRecipes.allMyRecipes
      };
      const newState = recipe(state, action);
      expect(newState.myRecipes[1].recipeName).toEqual(editedRecipe.recipeName);
      expect(newState.myRecipes[1].id).toEqual(1);
    }
  );

  it(
    'should return error message when EDIT_RECIPE_FAILURE is dispatched',
    () => {
      const error = 'cannot edit recipe';
      const action = actions.editRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it('should dispatch DELETE_RECIPE_SUCCESS on delete of recipe', () => {
    const { getMyRecipes } = dataMock;
    const recipeId = 1;
    const action = actions.deleteRecipeSuccess(recipeId);
    const state = {
      myRecipes: getMyRecipes.allMyRecipes,
      recipes: getMyRecipes.allMyRecipes
    };
    const newState = recipe(state, action);
    expect(newState.myRecipes.length).toEqual(1);
  });

  it(
    'should return error message when DELETE_RECIPE_FAILURE is dispathced',
    () => {
      const error = 'cannot delete recipe';
      const action = actions.deleteRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it('should dispatch VIEW_RECIPE_SUCCESS on view of a single recipe', () => {
    const { viewedRecipe } = dataMock;
    const action = actions.viewRecipeSuccess(viewedRecipe);
    const newState = recipe(initialState, action);
    expect(newState.recipe.recipeName).toEqual('foal meat');
    expect(newState.recipe.id).toEqual(1);
  });

  it(
    'should return error message for error while viewing single recipe',
    () => {
      const error = 'cannot get recipe';
      const action = actions.viewRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it(
    'should return updated upvote count when UPVOTE_RECIPE_SUCCESS is dispatched',
    () => {
      const { viewedRecipe } = dataMock;
      const action = actions.upVoteRecipeSuccess(viewedRecipe);
      const newState = recipe(initialState, action);
      expect(newState.upvotes).toEqual(0);
    }
  );

  it('should return error when upvote recipe fails to dispatch', () => {
    const error = 'cannot get upvote';
    const action = actions.upVoteRecipeFailure(error);
    const newState = recipe(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });

  it(
    'should return updated downvote count when DOWNVOTE_RECIPE_SUCCESS is dispatched',
    () => {
      const { viewedRecipe } = dataMock;
      const action = actions.downVoteRecipeSuccess(viewedRecipe);
      const newState = recipe(initialState, action);
      expect(newState.upvotes).toEqual(0);
    }
  );

  it('should return error when downvote recipe fails', () => {
    const error = 'cannot get downvote';
    const action = actions.downVoteRecipeFailure(error);
    const newState = recipe(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });

  it(
    'should add to favorite array when FAVORITE_RECIPE_SUCCESS is dispatched',
    () => {
      const { viewedRecipe } = dataMock;
      const action = actions.favoriteRecipeSuccess(viewedRecipe);
      const newState = recipe(initialState, action);
      expect(newState.recipe.favorites).toEqual(viewedRecipe.favorites);
    }
  );

  it(
    'should return error message when FAVORITE_RECIPE_SUCCESS is dispatched',
    () => {
      const error = 'favorite not found';
      const action = actions.favoriteRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it(
    'should return an array of favorited recipe when GET_FAVORITE_RECIPE_SUCCESS is dispatched',
    () => {
      const { viewedRecipe } = dataMock;
      const action = actions.getfavoriteRecipeSuccess(viewedRecipe.Favorites);
      const newState = recipe(initialState, action);
      expect(newState.favorites).toEqual(viewedRecipe.Favorites);
    }
  );

  it('should return error message when getting favorite recipe fails', () => {
    const error = 'favorite not found';
    const action = actions.getfavoriteRecipeFailure(error);
    const newState = recipe(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });

  it(
    'should dispatch SEARCH_RECIPE_SUCCESS when search action is called',
    () => {
      const searchData = 'rice';
      const action = actions.searchRecipeSuccess(searchData);
      const newState = recipe(initialState, action);
      expect(newState.SearchResults).toEqual(searchData);
    }
  );
  it(
    'should return error message when SEARH_RECIPE_FAILURE is dispatched',
    () => {
      const error = 'not found';
      const action = actions.searchRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it('should return search item when GET_SEARCH_ITEM is dispatched', () => {
    const search = 'rice';
    const action = {
      type: GET_SEARCH_ITEM,
      searchItem: search
    };
    const newState = recipe(initialState, action);
    expect(newState.searchItem).toEqual('rice');
  });

  it(
    'should return all user\'s favorited recipe when GET_ALL_FAVORITE_RECIPE_SUCCESS is dispatched',
    () => {
      const { getAllFavorite } = dataMock;
      const action = actions.getAllFavoriteRecipeSuccess(getAllFavorite.favRecipes);
      const newState = recipe(initialState, action);
      expect(newState.favRecipes).toEqual(getAllFavorite.favRecipes);
    }
  );

  it(
    'should return error message when GET_ALL_FAVORITE_RECIPE_FAILURE is dispatched',
    () => {
      const error = 'cannot get favorited recipes';
      const action = actions.getAllFavoriteRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it(
    'should reduce the length of the array when DELETE_FAVORITED_RECIPE_SUCCESS is dispatched',
    () => {
      const { favoriteData } = dataMock;
      const recipeId = 9;
      const action = actions.deleteFavoriteRecipeSuccess(recipeId);
      const state = {
        favorites: favoriteData
      };
      const newState = recipe(state, action);
      expect(newState.favorites.length).toEqual(1);
    }
  );

  it('should return error message when deleting favorited recipe fails', () => {
    const error = 'cannot delete favorite recipe';
    const action = actions.deleteFavoriteRecipeFailure(error);
    const newState = recipe(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });

  it(
    'should create review for a recipe when RECIPE_REVIEW_SUCCESS is dispatched',
    () => {
      const recipeReview = 'this is awesome';
      const action = actions.reviewRecipeSuccess(recipeReview);
      const newState = recipe(initialState, action);
      expect(newState.recipe.Reviews).toEqual([recipeReview]);
    }
  );

  it(
    'should return error message when REVIEW_RECIPE_FAILURE is dispatched',
    () => {
      const error = 'cannot review recipe';
      const action = actions.reviewRecipeFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it(
    'should dispatch DELETE_REVIEW SUCCESS when deleting review is successful',
    () => {
      const { ReviewedData } = dataMock;
      const deletedReviewId = 1;
      const action = actions.deleteRecipeReviewSuccess(deletedReviewId);
      const state = {
        recipe: { Reviews: ReviewedData }
      };
      const newState = recipe(state, action);
      expect(newState.recipe.Reviews.length).toEqual(2);
    }
  );

  it(
    'should return error message when DELETE_REVIEW_FAILURE is dispatched',
    () => {
      const error = 'cannot delete review';
      const action = actions.deleteRecipeReviewFailure(error);
      const newState = recipe(initialState, action);
      expect(newState.errorMessage).toEqual(error);
    }
  );

  it('should return the initial state of recipe action', () => {
    expect(recipe(undefined, {})).toEqual(initialState);
  });
});
