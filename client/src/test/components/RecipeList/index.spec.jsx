import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedRecipes, { Recipes }
  from '../../../js/components/RecipeList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const props = {
  apiGetRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  recipes: [],
  search: [],
  pageCount: 1,
  isLoadingRecipe: true,
  searchValue: '',
  searchItem: jest.fn(() => Promise.resolve({ ok: true }))
};


describe('Recipes snapshot', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Recipes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

it('should recieve next props', () => {
  const spy = sinon.spy(Recipes.prototype, 'componentWillReceiveProps');
  const nextProps = {
    apiGetRecipe: jest.fn(() => Promise.resolve({ ok: true })),
    recipes: [],
    search: [],
    pageCount: 1,
    isLoadingRecipe: true,
    searchValue: '',
    searchItem: jest.fn(() => Promise.resolve({ ok: true }))
  };

  const wrapper = shallow(<Recipes {...nextProps} />);
  wrapper.setProps({ prop: 12 });
  expect(spy.calledOnce).toEqual(true);
});

describe('onPageChange', () => {
  it('should change the page', () => {
    const current = {
      selected: 2
    };
    const wrapper = shallow(<Recipes {...props} />);
    wrapper.instance().onPageChange(current);
    expect(wrapper.instance().props.apiGetRecipe).toBeCalled();
  });
});

describe('Connected Recipes component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      recipe: {
        recipes: [],
        search: {},
        pageCount: 0,
        isLoadingRecipe: true,
        searchValue: ''
      }
    });
    const wrapper = shallow(<ConnectedRecipes store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
