import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import AddReviewForm from '../../../Partials/AddReviewForm';
import { apiDeleteRecipeReview } from '../../../../actions/recipe';

const image = require('../../../../../assets/images/no_picture.png');


/**
 *
 *
 * <@UNVERIFIED|@class> Reviews
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
    this.setState({
      availableReview: nextProps.reviewedRecipe.Reviews.length
    });
  }

  /**
   * @returns {void}
   *
   * @param {integer} id
   * @memberof RecipeAdmin
   */
  onDelete(id) {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.apiDeleteRecipeReview(id),
      onCancel: () => {},
    });
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
          {this.state.availableReview ?
      this.props.reviewedRecipe.Reviews.map(review =>
      (
        <li key={review.id} className="list-group-item">
          <div className="item">
            <div>
              <div style={{ display: 'inline-block' }} className="float-left review-avatar">
                <img
                  src={review.User.imageUrl || image}
                  alt="img"
                  className="review-img"
                />
              </div>

              <span style={{ margin: '12px 0 0 7px' }} className="float-left">
                {review.User.userName}
              </span>
              <span className="float-right review-time">
                {moment(new Date(review.createdAt)).fromNow()}
              </span>
              <span className="float-right delete-review">
                <i
                  className="fa fa-trash fa-1x text-danger"
                  role="button"
                  tabIndex="-1"
                  onKeyPress={this.onKeyPress}
                  onClick={() => this.onDelete(review.id)}
                />
              </span>
              <div style={{ clear: 'both' }} />
            </div>
            <p style={{ marginTop: '9px', fontSize: '24px', fontWeight: 200 }}>{review.reviews}</p>
          </div>
          {/* <span className="delete-review">
            <i
              className="fa fa-trash fa-1x text-danger"
              role="button"
              tabIndex="-1"
              onKeyPress={this.onKeyPress}
              onClick={() => {
                this.onDelete(review.id);
              }}
            />
          </span> */}

        </li>))
      : 'This recipe has not been reviewed yet' }
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
