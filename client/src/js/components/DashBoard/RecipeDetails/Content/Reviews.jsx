import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import moment from 'moment';
import AddReviewForm from '../../../Partials/AddReviewForm';
import { apiDeleteRecipeReview } from '../../../../actions/recipe';

const image = require('../../../../../assets/images/no_picture.png');


/**
 * @extends {React.Component}
 */
export class Reviews extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof RecipeAdmin
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      availableReview: 0
    };
    this.onDelete = this.onDelete.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {any} nextProps
   * @memberof RecipeAdmin
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.reviewedRecipe.Reviews) {
      this.setState({
        availableReview: nextProps.reviewedRecipe.Reviews.length
      });
    }
  }

  /**
   * @returns {void}
   *
   * @param {integer} id
   * @memberof RecipeAdmin
   */
  onDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this review!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.apiDeleteRecipeReview(id);
          swal('Poof! Your review has been deleted!', {
            icon: 'success',
          });
        }
      });
  }

  /**
   * @description Constructor function
   * @param {any} props
   * @memberof Reviews
   * @return {object} reviews
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
          {this.state.availableReview ?
      this.props.reviewedRecipe.Reviews.map(review =>
      (
        <li key={review.id} className="list-group-item">
          <div className="item">
            <div>
              <div className="float-left review-avatar">
                <img
                  src={review.User.imageUrl || image}
                  alt="img"
                  className="review-img"
                />
              </div>

              <span className="float-left review-user">
                {review.User.userName}
              </span>
              <span className="float-right review-time">
                {moment(new Date(review.createdAt)).fromNow()}
              </span>
              { review.userId === parseInt(localStorage.getItem('userId'), 10) ?
                <span
                  className="float-right delete-review"
                  data-toggle="tooltip"
                  title="Delete review"
                >
                  <i
                    className="fa fa-trash fa-1x text-danger"
                    role="button"
                    tabIndex="-1"
                    onKeyPress={this.onKeyPress}
                    onClick={() => this.onDelete(review.id)}
                  />
                </span>
              : ''}
              <div className="clear-float" />
            </div>
            <p className="reviews">
              {review.reviews}
            </p>
          </div>
        </li>))
      : <span className="reviewText">
      This recipe has not been reviewed yet, Add a review.
        </span> }
        </ul>
      </div>
    );
  }
}

Reviews.propTypes = {
  activeTab: PropTypes.objectOf(PropTypes.any).isRequired,
  recipeId: PropTypes.number,
  reviewedRecipe: PropTypes.objectOf(String).isRequired,
  apiDeleteRecipeReview: PropTypes.func.isRequired
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
