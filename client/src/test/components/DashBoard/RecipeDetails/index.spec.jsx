import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedMyRecipe, { MyRecipe }
  from '../../../../js/components/DashBoard/RecipeDetails/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  onViewRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apiUpVoteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apiDownVoteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apifavoriteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apiRecipeViewCount: jest.fn(() => Promise.resolve({ ok: true })),
  recipe: {},
  match: {
    params: {
      id: 2
    }
  },
  views: 0,
  history: {
    push: () => Promise.resolve({ ok: true }),
  }

};


describe('MyRecipe snapshot', () => {
  it('should render correctly', () => {
    const recipeAdmin = shallow(<MyRecipe {...props} />);
    expect(recipeAdmin).toMatchSnapshot();
  });
});

describe('RecipeAdmin component', () => {
  describe('handleChangeTab', () => {
    it('should change the tab', () => {
      const wrapper = shallow(<MyRecipe {...props} />);
      //   wrapper.setState({ activeTab: 'tab' });
      wrapper.instance().handleChangeTab(3);
      expect(wrapper.state().activeTab).toEqual(3);
    });
  });
  describe('handleUpvotes', () => {
    it('should handle the upvote', () => {
      const wrapper = shallow(<MyRecipe {...props} />);
      wrapper.instance().handleupvote();
      expect(wrapper.instance().props.apiUpVoteRecipe).toBeCalled();
    });
  });

  describe('handleDownvotes', () => {
    it('should handle downvote', () => {
      const wrapper = shallow(<MyRecipe {...props} />);
      wrapper.instance().handledownvote();
      expect(wrapper.instance().props.apiDownVoteRecipe).toBeCalled();
    });
  });

  describe('handleFavorite', () => {
    it('should handle favorite', () => {
      const wrapper = shallow(<MyRecipe {...props} />);
      wrapper.instance().handlefavorite();
      expect(wrapper.instance().props.apifavoriteRecipe).toBeCalled();
    });
  });

  describe('onViewRecipe', () => {
    it('should throw error if wrong route is called', () => {
      const rejectProps = {
        onViewRecipe: jest.fn(() => Promise.reject(new Error('fail'))),
        apiUpVoteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
        apiDownVoteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
        apifavoriteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
        apiRecipeViewCount: jest.fn(() => Promise.resolve({ ok: true })),
        recipe: {},
        match: {
          params: {
            id: 2
          }
        },
        views: 0,
        history: {
          push: () => Promise.resolve({ ok: true }),
        }
      };
      const wrapper = shallow(<MyRecipe {...rejectProps} />);
      expect(wrapper.instance().props.onViewRecipe).toBeCalled();
    });
  });

  describe('Connected MyRecipe component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          recipe: {},
          views: 0
        },
      });
      const wrapper = shallow(<ConnectedMyRecipe store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
