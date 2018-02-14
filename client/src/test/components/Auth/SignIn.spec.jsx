import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../../js/components/Auth/SignIn';

const userInput = {
  identifier: 'tester',
  password: 'tester123'
};

const props = {
  apiLoginUser: jest.fn(() => Promise.resolve({ ok: true })),
  history: {
    push: () => {}
  }
};
describe('Component: SignIn', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('sign in snapshot', () => {
    it('should render correctly', () => {
      const signIn = shallow(<SignIn {...props} />);
      expect(signIn).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'password', value: 'tester123' },
      };
      const signIn = shallow(<SignIn {...props} />);
      const passwordField = signIn.find('#Form-pass1');
      passwordField.simulate('change', event);
      expect(signIn.instance().state.password).toBe('tester123');
    });
  });

  describe('onClick', () => {
    it('should login user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<SignIn {...props} />);
      submit.setState(userInput);
      submit.setState({ hasError: true, errorMessage: 'error', errors: {} });
      submit.instance().onClick(event);
    });

    it('should login error when incorrect detail is passed', () => {
      const event = {
        preventDefault: jest.fn()
      };
      props.apiLoginUser = () => Promise.reject(new Error('fail'));
      const submit = shallow(<SignIn {...props} />);
      submit.instance().onClick(event);
    });
  });

  describe('onDismiss', () => {
    it('should return state back to default', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const dismiss = shallow(<SignIn {...props} />);
      dismiss.setState({ hasError: true, errorMessage: 'error' });
      const form = dismiss.find('.close');
      form.simulate('click', event);
    });
  });
});

