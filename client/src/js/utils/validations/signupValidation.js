import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
/**
 * @description validation function
 *
 * @export
 *
 * @param {any} data
 *
 * @returns {void}
 */
export default function validateSignupInput(data) {
  const errors = {};
  const userName = data.userName.trim();
  const password = data.password.trim();

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';
  }

  if (Validator.isEmpty(userName)) {
    errors.userName = 'This field is required';
  } else if (userName.length < 6) {
    errors.userName = 'Username is too short, Must be min. of 6';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'This field is required';
  } else if (password.length < 8) {
    errors.password = 'Password is too short, Must be min. of 8';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Password does not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
