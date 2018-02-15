import React from 'react';
import { shallow } from 'enzyme';
import Tabs
  from '../../../../../js/components/DashBoard/RecipeDetails/Tabs/index';

const props = {
  isActive: false,
  activeTab: 1
};


describe('Tabs snapshot', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

