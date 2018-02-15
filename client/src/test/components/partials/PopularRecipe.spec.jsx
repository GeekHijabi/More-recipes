import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedPopularRecipe, { PopularRecipe }
  from '../../../js/components/Partials/PopularRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const props = {
  apiGetAllFavoriteRecipes: jest.fn(() => Promise.resolve({ ok: true })),
  // searchItem: jest.fn(() => Promise.resolve({ ok: true }))
};
describe('Component: PopularRecipe', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('PopularRecipe in snapshot', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<PopularRecipe {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Connected PopularRecipe component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          favRecipes: []
        }
      });
      const wrapper = shallow(<ConnectedPopularRecipe store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});

