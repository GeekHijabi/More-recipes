import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import { apireviewRecipe } from '../../actions/recipe';

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
    console.log('review is', this.state.review);
    this.props.apireviewRecipe(this.props.recipeId, reviews);
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
          <label htmlFor="add-recipe" id="label">Add recipe</label>
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
  apireviewRecipe: PropTypes.func.isRequired,
};

export default connect(null, { apireviewRecipe })(AddReviewForm);
