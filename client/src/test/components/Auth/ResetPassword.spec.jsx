import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../../../js/components/Auth/ResetPassword';

const userInput = {
  newPassword: 'tester123',
  confirmPassword: 'tester123',
  userId: 2
};

const props = {
  apiResetPassword: jest.fn(() => Promise.resolve({ ok: true })),
  history: {
    push: () => {}
  }
};
describe('Component: ResetPassword', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('reset password in snapshot', () => {
    it('should render correctly', () => {
      const resetPassword = shallow(<ResetPassword {...props} />);
      expect(resetPassword).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'newPassword', value: 'tester123' },
      };
      const resetPassword = shallow(<ResetPassword {...props} />);
      resetPassword.instance().onChange(event);
      expect(resetPassword.instance().state.newPassword).toBe('tester123');
    });
  });

  describe('onClick', () => {
    it('should login user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<ResetPassword {...props} />);
      submit.setState(userInput);
      submit.instance().onClick(event);
    });
  });

  // describe('isValid', () => {
  //   it('should check if data is valid', () => {
  //     const errors = {
  //       email: ''
  //     };
  //     const event = {
  //       preventDefault: jest.fn()
  //     };
  //     const isNotvalid = shallow(<ResetPassword {...props} />);
  //     isNotvalid.setState(errors);
  //     isNotvalid.instance().isValid(event);
  //   });
  // });
});

