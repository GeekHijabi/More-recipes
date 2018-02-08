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
export default function validateRecipeInput(data) {
  const recipeName = data.recipeName.trim();
  const ingredients = data.ingredients.trim();
  const description = data.description.trim();
  const errors = {};

  if (Validator.isEmpty(recipeName)) {
    errors.recipeName = 'This field is required';
  }

  if (Validator.isEmpty(ingredients)) {
    errors.ingredients = 'This field is required';
  }

  if (Validator.isEmpty(description)) {
    errors.description = 'This field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
