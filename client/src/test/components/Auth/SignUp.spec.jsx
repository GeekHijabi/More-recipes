import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../js/components/Auth/SignUp';

const userInput = {
  identifier: 'tester',
  password: 'tester123'
};


const props = {
  apiRegisterUser: jest.fn(() => Promise.resolve()),
  apiLoginUser: jest.fn(() => Promise.resolve()),
  history: {
    push: () => {}
  }
};
describe('Component: SignUp', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('sign up snapshot', () => {
    it('should render correctly', () => {
      const signUp = shallow(<SignUp {...props} />);
      expect(signUp).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'password', value: 'tester123' },
      };
      const signUp = shallow(<SignUp {...props} />);
      const passwordField = signUp.find('#Form-pass1');
      passwordField.simulate('change', event);
      expect(signUp.instance().state.password).toBe('tester123');
    });
  });

  describe('onClick', () => {
    it('should signup user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<SignUp {...props} />);
      submit.setState(userInput);
      submit.setState({ hasError: true, errorMessage: 'error' });
      submit.instance().onClick(event);
    });

    it('should login error when incorrect detail is passed', () => {
      const event = {
        preventDefault: jest.fn()
      };
      props.apiLoginUser = () => Promise.reject(new Error('fail'));
      const submit = shallow(<SignUp {...props} />);
      submit.instance().onClick(event);
    });
  });

  describe('onDismiss', () => {
    it('should return state back to default', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const dismiss = shallow(<SignUp {...props} />);
      dismiss.setState({ hasError: true, errorMessage: 'error' });
      const form = dismiss.find('.close');
      form.simulate('click', event);
    });
  });
});

