import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedRecipeAdmin, { RecipeAdmin }
  from '../../../../js/components/DashBoard/MyRecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  apiLoginUser: jest.fn(() => Promise.resolve({ ok: true })),
  apiCreateRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apiGetMyRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apiDeleteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  apiEditRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  onViewRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  myRecipes: [
    {
      id: 1,
      recipeName: 'rice',
      description: 'boil rice',
      ingredients: 'rice, water'
    },
    {
      id: 2,
      recipeName: 'beans',
      description: 'cook beans',
      ingredients: 'beans, water'
    }
  ],
  errorMessage: 'error',
  pageCount: 122,
  isLoadingRecipe: false,
  history: {
    push: () => Promise.resolve({ ok: true }),
  }

};


describe('RecipeAdmin snapshot', () => {
  it('should render correctly', () => {
    const recipeAdmin = shallow(<RecipeAdmin {...props} />);
    expect(recipeAdmin).toMatchSnapshot();
  });
});

describe('RecipeAdmin component', () => {
  it('should recieve next props', () => {
    const spy = sinon.spy(RecipeAdmin.prototype, 'componentWillReceiveProps');
    const nextProps = {
      apiLoginUser: jest.fn(() => Promise.resolve({ ok: true })),
      apiCreateRecipe: jest.fn(() => Promise.resolve({ ok: true })),
      apiGetMyRecipe: jest.fn(() => Promise.resolve({ ok: true })),
      apiDeleteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
      apiEditRecipe: jest.fn(() => Promise.resolve({ ok: true })),
      onViewRecipe: jest.fn(() => Promise.resolve({ ok: true })),
      myRecipes: [
        {
          id: 1,
          recipeName: 'rice',
          description: 'boil rice',
          ingredients: 'rice, water'
        },
        {
          id: 2,
          recipeName: 'beans',
          description: 'cook beans',
          ingredients: 'beans, water'
        }
      ],
      errorMessage: 'error',
      pageCount: 122,
      page: 2,
      isLoadingRecipe: false

    };
    const wrapper = shallow(<RecipeAdmin {...nextProps} />);
    wrapper.setProps({ prop: 12 });
    expect(spy.calledOnce).toEqual(true);
  });
  describe('onPageChange', () => {
    it('should change the page', () => {
      const current = {
        selected: 2
      };
      const wrapper = shallow(<RecipeAdmin {...props} />);
      wrapper.instance().onPageChange(current);
      expect(wrapper.instance().props.apiGetMyRecipe).toBeCalled();
    });
  });

  describe('onDelete', () => {
    it('should delete the recipe', () => {
      const wrapper = shallow(<RecipeAdmin {...props} />);
      wrapper.instance().onDelete(2);
      expect(wrapper.instance().props.apiDeleteRecipe).toBeCalled();
      expect(wrapper.instance().props.apiDeleteRecipe.mock.calls.length).toEqual(1);
    });
  });

  describe('toggle', () => {
    it('should toggle the modal', () => {
      const wrapper = shallow(<RecipeAdmin {...props} />);
      wrapper.setState({ modal: true });
      wrapper.instance().toggle();
      expect(wrapper.state().modal).toEqual(false);
    });
  });
  describe('viewRecipe', () => {
    it('should display recipe information', () => {
      const wrapper = shallow(<RecipeAdmin {...props} />);
      wrapper.instance().viewRecipe(2);
      expect(wrapper.instance().props.onViewRecipe).toBeCalled();
      expect(wrapper.instance().props.onViewRecipe.mock.calls.length)
        .toEqual(1);
    });
  });

  describe('Connected RecipeAdmin component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          allRecipes: {},
          myRecipes: [
            {

            }
          ],
          errorMessage: ''

        },
      });
      const wrapper = shallow(<ConnectedRecipeAdmin store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
