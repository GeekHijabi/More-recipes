import React from 'react';
import { shallow } from 'enzyme';
import { AddRecipeModal } from '../../../js/components/Partials/AddRecipeModal';

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
  createRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  toggle: jest.fn(() => Promise.resolve({ ok: true })),
  isOpen: true,
  isLoadingRecipe: true
};
describe('Component: AddRecipeModal', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('AddRecipeModal snapshot', () => {
    it('should render correctly', () => {
      const signIn = shallow(<AddRecipeModal {...props} />);
      expect(signIn).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'ingredients', value: 'rice, water' },
      };
      const wrapper = shallow(<AddRecipeModal {...props} />);
      wrapper.instance().onChange(event);
      expect(wrapper.instance().state.ingredients).toBe('rice, water');
    });
  });

  describe('onSubmit', () => {
    it('should add recipe when recipe details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<AddRecipeModal {...props} />);
      submit.setState(recipeInput);
      submit.setState({ hasError: false });
      submit.instance().onSubmit(event);
    });
    it('should return error when recipeName is empty', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const noRecipeName = {
        recipeName: '',
        ingredients: 'rice, oil',
        description: 'boil rice'
      };
      const submit = shallow(<AddRecipeModal {...props} />);

      submit.setState(noRecipeName);
      submit.setState({ hasError: true, errorMessage: 'error' });
      submit.instance().onSubmit(event);
    });
    it('should return error when ingredients is empty', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const noRecipeName = {
        recipeName: 'rice',
        ingredients: '',
        description: 'boil rice'
      };
      const submit = shallow(<AddRecipeModal {...props} />);

      submit.setState(noRecipeName);
      submit.setState({ hasError: true, errorMessage: 'error' });
      submit.instance().onSubmit(event);
    });
    it('should return error when description is empty', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const noRecipeName = {
        recipeName: 'rice',
        ingredients: 'rice, oil',
        description: ''
      };
      const submit = shallow(<AddRecipeModal {...props} />);

      submit.setState(noRecipeName);
      submit.setState({ hasError: true, errorMessage: 'error' });
      submit.instance().onSubmit(event);
    });
  });

  describe('isValid', () => {
    it('should check if data is valid', () => {
      const errors = {
        email: ''
      };
      const event = {
        preventDefault: jest.fn()
      };
      const isNotvalid = shallow(<AddRecipeModal {...props} />);
      isNotvalid.setState(recipeInput);
      isNotvalid.setState(errors);
      isNotvalid.instance().isValid(event);
    });
  });
});
