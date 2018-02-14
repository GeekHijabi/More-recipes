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
export default function validateresetPasswordInput(data) {
  const errors = {};
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'This field is required';
  } else if (data.newPassword.length < 8) {
    errors.newPassword = 'Password is too short, Must be min. of 8';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }

  if (!Validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = 'Password does not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
