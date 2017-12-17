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
    <AddReviewForm recipeId={props.recipeId}/> 
  </div>
);

Reviews.propTypes = {
  activeTab: PropTypes.func.isRequired,
};

export default Reviews;
