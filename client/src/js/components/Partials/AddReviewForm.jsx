import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { apiRecipeReview, onViewRecipe } from '../../actions/recipe';

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class AddReviewForm extends React.Component {
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
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }


//   /**
//  * @returns {void}
//  *
//  * @param {any} void
//  * @memberof AddReviewForm
//  */
//   componentWillMount() {
//     this.props.onViewRecipe(this.props.recipeId);
//   }


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
    const reviews = this.state.review;
    event.preventDefault();
    this.props.apiRecipeReview(this.props.recipeId, reviews);
  }

  /**
 *
 *
 * @class AddReviewForm
 * @extends {React.Component}
 */
  render() {
    return (

      <div className="review-form" placeholder="Add review">
        <div className="input-control">
          <label htmlFor="add-review" id="label">Post review</label>
          <input
            type="text"
            placeholder="input your review"
            id="add-review"
            name="review"
            onChange={this.onChange}
            value={this.state.review}
          />
        </div>
        <button
          type="button"
          className="btn blue-gradient btn-white btn-block btn-rounded z-depth-1a"
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
  onViewRecipe: PropTypes.func.isRequired,
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
