import React from 'react';
import { shallow } from 'enzyme';
import Tabs
  from '../../../../../js/components/DashBoard/RecipeDetails/Tabs/index';

const props = {
  isActive: false,
  activeTab: {
    name: 'ingredients'
  }
};


describe('Tabs snapshot', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

// describe('handleClick', () => {
//   it('should change the tab on click', () => {
//     const wrapper = shallow(<Tabs {...props} />);
//     wrapper.instance().handleClick();
//     wrapper.simulate('click', activeTab);
//     expect(wrapper.instance().props.changeTab()).toBeCalled();
//   });
// });

