import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Reviews }
  from '../../../../../js/components/DashBoard/RecipeDetails/Content/Reviews';

const props = {
  apiDeleteRecipeReview: jest.fn(() => Promise.resolve({ ok: true })),
  recipe: {
    ingredient: '',
    description: '',
  },
  description: 'boil rice',
  activeTab: {
    name: {
      ingredients: 'ingredients',
      description: 'description',
      reviews: 'reviews'
    }
  },
  reviewedRecipe: {
    id: 1,
    recipeName: 'rice',
    description: 'boil rice',
    ingredients: 'rice, water'
  },
  recipeId: 2
};

describe('Component: Reviews', () => {
  beforeEach(() => {
    global.swal = {
      success: () => {},
      error: () => {}
    };
  });
  describe('Review snapshot', () => {
    it('should render correctly', () => {
      const reviews = shallow(<Reviews {...props} />);
      expect(reviews).toMatchSnapshot();
    });
  });
  it('should recieve next props', () => {
    const spy = sinon.spy(Reviews.prototype, 'componentWillReceiveProps');
    const nextProps = {
      apiDeleteRecipeReview: jest.fn(() => Promise.resolve({ ok: true })),
      recipe: {
        ingredient: '',
        description: '',
      },
      description: 'boil rice',
      activeTab: {
        name: {
          ingredients: 'ingredients',
          description: 'description',
          reviews: 'reviews'
        }
      },
      reviewedRecipe: {
        Reviews: [
          {
            id: 2,
            Reviews: 'Nice one',
            User: {
              imageUrl: 'imageUrl',
              userName: 'userName'

            }
          }
        ]
      },
      recipeId: 2
    };

    const wrapper = shallow(<Reviews {...nextProps} />);
    wrapper.setProps({ nextProps });
    expect(spy.calledOnce).toEqual(true);
  });

  describe('onDelete', () => {
    it('should remove the review', () => {
      const wrapper = shallow(<Reviews {...props} />);
      wrapper.instance().onDelete();
      expect(props.apiDeleteRecipeReview.mock.calls.length).toEqual(0);
    });
  });
});
