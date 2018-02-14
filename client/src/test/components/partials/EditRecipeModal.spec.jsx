import React from 'react';
import { shallow } from 'enzyme';
import { EditRecipeModal }
  from '../../../js/components/Partials/EditRecipeModal';

const recipeInput = {
  recipeName: 'rice',
  ingredients: 'rice, water',
  description: 'boil rice',
  imageUrl: '',
  errors: {},
  errorMessage: '',
  isLoading: false,
  hasError: false
};

const props = {
  editRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  recipe: {},
  toggle: jest.fn(() => Promise.resolve({ ok: true })),
  isOpen: true,
  isLoadingRecipe: true
};
describe('Component: EditRecipeModal', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('EditRecipeModal snapshot', () => {
    it('should render correctly', () => {
      const signIn = shallow(<EditRecipeModal {...props} />);
      expect(signIn).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'ingredients', value: 'rice, water' },
      };
      const wrapper = shallow(<EditRecipeModal {...props} />);
      wrapper.instance().onChange(event);
      expect(wrapper.instance().state.ingredients).toBe('rice, water');
    });
  });

  describe('onSubmit', () => {
    it('should add recipe when recipe details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<EditRecipeModal {...props} />);
      submit.setState(recipeInput);
      submit.setState({ hasError: false });
      submit.instance().onSubmit(event);
    });
  });
});
