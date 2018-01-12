import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddReviewForm from '../../../Partials/AddReviewForm';
import { apiDeleteRecipeReview } from '../../../../actions/recipe';


/**
 *
 *
 * @class Reviews
 * @extends {React.Component}
 */
class Reviews extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof RecipeAdmin
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {integer} id
   * @memberof RecipeAdmin
   */
  onDelete(id) {
    this.props.apiDeleteRecipeReview(id);
  }

  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <div
        className={this.props.activeTab.name === 'Reviews' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
        id="reviews"
        role="tabpanel"
        aria-labelledby="reviews-tab"
      >
        <AddReviewForm
          recipeId={this.props.recipeId}
        />
        <ul className={this.props.activeTab.name === 'Reviews' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
        >
          {this.props.activeTab.name === 'Reviews' ?
      this.props.reviewedRecipe.Reviews.map(review =>
      (
        <li key={review.id} className="list-group-item">
          <div className="item">
            <div className="review-avatar">
              <img src={review.User.imageUrl} alt="img" className="review-img" />
            </div>
            <span className="review-time">{moment(new Date(review.createdAt)).fromNow()}</span>
            <span className="review-user">{review.User.userName}
            </span>
            <p>{review.reviews}</p>
          </div>
          <span className="delete review">
            <i
              className="fa fa-trash fa-1x text-danger"
              role="button"
              tabIndex="-1"
              onKeyPress={this.onKeyPress}
              onClick={() => {
                this.onDelete(review.id);
              }}
            />
          </span>

        </li>))
      : 'no-reviews' }
        </ul>
      </div>
    );
  }
}

// const Reviews = props => (
//   <div
//     className={props.activeTab.name === 'Reviews' ?
//     'tab-pane fade show active' :
//     'tab-pane fade'}
//     id="reviews"
//     role="tabpanel"
//     aria-labelledby="reviews-tab"
//   >
//     <AddReviewForm
//       recipeId={props.recipeId}
//     />
//     <ul className={props.activeTab.name === 'Reviews' ?
//     'tab-pane fade show active' :
//     'tab-pane fade'}
//     >
//       {props.activeTab.name === 'Reviews' ?
//       props.reviewedRecipe.Reviews.map(review =>
//       (
//         <li key={review.id} className="list-group-item">
//           <h6>{review.User.userName}
//             {moment(new Date(review.createdAt)).fromNow()}
//           </h6>
//           {review.reviews}

//         </li>))
//       : 'no-reviews' }
//     </ul>
//   </div>
// );


Reviews.propTypes = {
  activeTab: PropTypes.objectOf(PropTypes.any).isRequired,
  recipeId: PropTypes.number,
  reviewedRecipe: PropTypes.objectOf(String).isRequired,
};

Reviews.defaultProps = {
  recipeId: 0
};

export default connect(
  null,
  {
    apiDeleteRecipeReview
  }
)(Reviews);


// export default Reviews;
