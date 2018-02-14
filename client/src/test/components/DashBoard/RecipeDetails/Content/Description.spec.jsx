import React from 'react';
import { shallow } from 'enzyme';
import { Description }
  from '../../../../../js/components/DashBoard/RecipeDetails/Content/Descriptions';

const props = {
  description: 'boil rice',
  activeTab: {
    name: 'description',
  }
};


describe('Description snapshot', () => {
  it('should render correctly', () => {
    const description = shallow(<Description {...props} />);
    expect(description).toMatchSnapshot();
  });
});
