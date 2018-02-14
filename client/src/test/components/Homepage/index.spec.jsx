import React from 'react';
import expect from 'expect';
// import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';

import HomePage from '../../../js/components/Home/index';

// configure({ adapter: new Adapter() });

describe('Homepage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
