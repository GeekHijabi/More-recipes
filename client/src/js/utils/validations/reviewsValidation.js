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
export default function validatereviewInput(data) {
  const reviews = data.review.trim();
  const errors = {};

  if (Validator.isEmpty(reviews)) {
    errors.reviews = 'Review field cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
