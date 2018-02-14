import React from 'react';
import { shallow } from 'enzyme';
import Tab
  from '../../../../../js/components/DashBoard/RecipeDetails/Tabs/Tab';

const props = {
  handleClick: jest.fn(() => Promise.resolve({ ok: true })),
  isActive: false,
  tabOption: {
    id: 3, name: 'Reviews', isActive: false
  }
};


describe('Tab snapshot', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Tab {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

