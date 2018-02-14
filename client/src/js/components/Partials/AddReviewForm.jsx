import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validatereviewInput from '../../utils/validations/reviewsValidation';
import { apiRecipeReview, onViewRecipe } from '../../actions/recipe';

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
export class AddReviewForm extends React.Component {
/**
 *
 *@param {object} props
 * @returns {null} void
 * @memberof AddReviewForm
 */
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignIn
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof AddReviewForm
 */
  onClick(event) {
    if (this.isValid()) {
      const reviews = this.state.review;
      event.preventDefault();
      this.props.apiRecipeReview(this.props.recipeId, reviews);
      this.setState({ review: '' });
    }
  }

  /**
  *
  * @param {any} event
  * @memberof SignUp
  * @returns {object} event
  */
  isValid() {
    const { errors, isValid } = validatereviewInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
 *
 *
 * @class AddReviewForm
 * @extends {React.Component}
 */
  render() {
    const { errors } = this.state;
    return (
      <div className="review-form" placeholder="Add review">
        <div className="input-control add-review">
          <label
            htmlFor="review"
            id="label"
            style={{ width: '100%', margin: '0 auto' }}
          >
            <textarea
              className="review-edit"
              type="text"
              placeholder="input your review"
              id="add-review"
              col="3"
              name="review"
              onChange={this.onChange}
              value={this.state.review}
            />
            {errors.reviews &&
            <small style={{ color: '#A43741' }}>
              {errors.reviews }
            </small>}
          </label>
        </div>
        <button
          type="button"
          className="review-btn"
          onClick={this.onClick}
        >
           Add review
        </button>
      </div>
    );
  }
}
AddReviewForm.propTypes = {
  apiRecipeReview: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired,
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    review: state.recipe.recipe.Reviews,
  };
}

export default connect(
  mapStateToProps,
  {
    apiRecipeReview,
    onViewRecipe
  }
)(AddReviewForm);
