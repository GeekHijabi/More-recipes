import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import App from '../../js/app';

localStorage.setItem('token', 'psdafdf');

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should render routes correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
