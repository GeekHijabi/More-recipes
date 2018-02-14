import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedTrendingRecipe, { TrendingRecipe }
  from '../../../js/components/Partials/TrendingRecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const props = {
  apiGetRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  recipes: []
};
describe('Component: TrendingRecipe', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('TrendingRecipe in snapshot', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<TrendingRecipe {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Connected TrendingRecipe component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          favRecipes: []
        }
      });
      const wrapper = shallow(<ConnectedTrendingRecipe store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});

