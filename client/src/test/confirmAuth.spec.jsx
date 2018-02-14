import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../js/components/Partials/Footer';
import Authorize from '../js/confirmAuth';

import configureStore from '../js/store/configureStore';
import mockLocalStorage from './__mocks__/localStorageMock';

window.localStorage = mockLocalStorage;
const components = Authorize(Footer);
const { WrappedComponent } = components;
const props = {
  signout: jest.fn(),
  auth: { }
};
const context = {
  router: {
    history: {
      push: jest.fn()
    }
  }
};
window.localStorage.setItem('token', 'kdrhkhdkjhvzhdjvhvbd.jvgjhxbdvh.jdvcxhjvxhvv∫');
describe('Test for Confirm Authentication', () => {
  it('should render component', () => {
    const wrapper = shallow(<WrappedComponent {...props} />, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
