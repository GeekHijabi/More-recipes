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
export default function validateforgotPasswordInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
