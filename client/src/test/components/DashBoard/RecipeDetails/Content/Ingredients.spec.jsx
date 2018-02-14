import React from 'react';
import { shallow } from 'enzyme';
import { Ingredients }
  from '../../../../../js/components/DashBoard/RecipeDetails/Content/Ingredients';

const props = {
  ingredients: 'water, rice',
  activeTab: {
    name: 'ingredients',
  }
};

describe('Ingredients snapshot', () => {
  it('should render correctly', () => {
    const ingredients = shallow(<Ingredients {...props} />);
    expect(ingredients).toMatchSnapshot();
  });
});
