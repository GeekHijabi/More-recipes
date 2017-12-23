import React from 'react';
import PropTypes from 'prop-types';
import AddReviewForm from '../../../Partials/AddReviewForm';


const Reviews = props => (
  <div
    className={props.activeTab.name === 'Reviews' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
    id="reviews"
    role="tabpanel"
    aria-labelledby="reviews-tab"
  >
    <AddReviewForm
      recipeId={props.recipeId}
    />
    <ul className={props.activeTab.name === 'Reviews' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
    >
      {props.activeTab.name === 'Reviews' ?
      props.reviewedRecipe.Reviews.map(review =>
        (<li>{review.reviews}</li>))
      : 'No Reviews'}

    </ul>
  </div>
);


Reviews.propTypes = {
  activeTab: PropTypes.func.isRequired,
  recipeId: PropTypes.objectOf(String).isRequired,
  reviewedRecipe: PropTypes.objectOf(String).isRequired,
};

export default Reviews;
