import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedReviewForm, { AddReviewForm }
  from '../../../js/components/Partials/AddReviewForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const review = {
  review: 'nice'
};

const props = {
  apiRecipeReview: jest.fn(() => Promise.resolve({ ok: true })),
  recipeId: 1
};
describe('Component: AddReviewForm', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('AddReviewForm in snapshot', () => {
    it('should render correctly', () => {
      const forgotPassword = shallow(<AddReviewForm {...props} />);
      expect(forgotPassword).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'review', value: 'nice recipe' },
      };
      const forgotPassword = shallow(<AddReviewForm {...props} />);
      forgotPassword.instance().onChange(event);
      expect(forgotPassword.instance().state.review).toEqual('nice recipe');
    });
  });

  describe('onClick', () => {
    it('should submit form', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<AddReviewForm {...props} />);
      submit.setState(review);
      submit.setState({ hasError: true, errorMessage: 'error', errors: {} });
      submit.instance().onClick(event);
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
      const isNotvalid = shallow(<AddReviewForm {...props} />);
      // isNotvalid.setState(userInput);
      isNotvalid.setState(errors);
      isNotvalid.instance().isValid(event);
    });
  });
  describe('Connected RecipeAdmin component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          recipe: {
            Reviews: []
          },
        }
      });
      const wrapper = shallow(<ConnectedReviewForm store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});

