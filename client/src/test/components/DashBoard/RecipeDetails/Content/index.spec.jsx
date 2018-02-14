import React from 'react';
import { shallow } from 'enzyme';
import { Content }
  from '../../../../../js/components/DashBoard/RecipeDetails/Content';

const props = {
  recipe: {
    ingredient: '',
    description: '',
  },
  description: 'boil rice',
  activeTab: {
    ingredients: 'ingredients',
    description: 'description',
    reviews: 'reviews'
  },
  reviewedRecipe: {
    id: 1,
    recipeName: 'rice',
    description: 'boil rice',
    ingredients: 'rice, water'
  },
  recipeId: 2
};


describe('Content snapshot', () => {
  it('should render correctly', () => {
    const content = shallow(<Content {...props} />);
    expect(content).toMatchSnapshot();
  });
});
