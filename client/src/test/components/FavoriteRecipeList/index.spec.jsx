import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedFavoriteRecipes, { FavoriteRecipes }
  from '../../../js/components/FavoriteRecipeList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const props = {
  apiGetFavoriteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  favorites: []
};


describe('FavoriteRecipes snapshot', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<FavoriteRecipes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Connected FavoriteList component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      recipe: {
        favorites: []
      }
    });
    const wrapper = shallow(<ConnectedFavoriteRecipes store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
