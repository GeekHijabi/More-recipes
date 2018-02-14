import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedCardItem, { CardItem }
  from '../../../js/components/Partials/CardItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  apiDeleteFavoriteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  recipe: {
    id: 1,
    recipeName: 'rice',
    imageUrl: '',
    upvotes: 0,
    downvotes: 0,
    favoriteCount: 2,
    views: 2
  },
};
describe('Component: CardItem', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    global.swal = {
      success: () => {},
      error: () => {}
    };
  });


  describe('onDelete', () => {
    it('should remove the recipe', () => {
      const wrapper = shallow(<CardItem {...props} />);
      wrapper.instance().onDelete();
      expect(props.apiDeleteFavoriteRecipe.mock.calls.length).toEqual(0);
    });
  });

  describe('Connected RecipeAdmin component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          favorites: {}

        },
      });
      const wrapper = shallow(<ConnectedCardItem store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
