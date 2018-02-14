import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPassword } from '../../../js/components/Auth/ForgotPassword';

const userInput = {
  email: 'test@tester.com'
};

const props = {
  apiForgotPassword: jest.fn(() => Promise.resolve({ ok: true })),
  history: {
    push: () => Promise.resolve({ ok: true }),
  }
};
describe('Component: ForgotPassword', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('forgot password in snapshot', () => {
    it('should render correctly', () => {
      const forgotPassword = shallow(<ForgotPassword {...props} />);
      expect(forgotPassword).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'email', value: 'tester@test.com' },
      };
      const forgotPassword = shallow(<ForgotPassword {...props} />);
      forgotPassword.instance().onChange(event);
      expect(forgotPassword.instance().state.email).toEqual('tester@test.com');
    });
  });

  describe('onClick', () => {
    it('should login user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<ForgotPassword {...props} />);
      submit.setState(userInput);
      submit.setState({ hasError: true, errorMessage: 'error', errors: {} });
      submit.instance().onClick(event);
    });
  });

  describe('isValid', () => {
    it('should check if data is valid', () => {
      const errors = {
        email: ''
      };
      const event = {
        preventDefault: jest.fn()
      };
      const isNotvalid = shallow(<ForgotPassword {...props} />);
      // isNotvalid.setState(userInput);
      isNotvalid.setState(errors);
      isNotvalid.instance().isValid(event);
    });
  });
});

