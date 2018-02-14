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
export default function validateSigninInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password is too short, Must be min. of 8';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
