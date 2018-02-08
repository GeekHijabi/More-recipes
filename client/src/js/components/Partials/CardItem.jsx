import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { apiDeleteFavoriteRecipe } from '../../actions/recipe';

const image = require('../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class CardItem extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onDelete = this.onDelete.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {integer} id
   * @memberof RecipeAdmin
   */
  onDelete() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will need to add to favorite again!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.apiDeleteFavoriteRecipe(this.props.recipe.id);
          swal('Recipe removed from favorite!', {
            icon: 'success',
          });
        }
      });
  }

  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const {
      recipe: {
        id,
        recipeName,
        imageUrl,
        upvotes,
        downvotes,
        favoriteCount,
        views
      }
    } = this.props;
    const url = window.location.href;
    const currentURL = url.split('/')[url.split('/').length - 1];
    return (
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 mb-3">
        <div className="card-style">
          <div className="card card-size">
            <img
              className="card-img-top card-height"
              src={imageUrl || image}
              alt="Card cap"
            />
            <div className="card-body">
              <h4 className="card-title">{recipeName}</h4>
              <div className="row row-card">
                <div className="col-xs-12 col-sm-6 card-padding">
                  <Link
                    className="btn card-view"
                    to={`/recipe/${id}`}
                    href={`/recipe/${id}`}
                  >
                  View Details
                  </Link>
                </div>
                {currentURL === 'favorites' ?
                  <span className="remove-fav">
                    <i
                      className="fa fa-trash fa-2x fa-icons"
                      role="button"
                      tabIndex="-1"
                      data-toggle="tooltip"
                      title="Remove from favorite"
                      onKeyPress={this.onKeyPress}
                      onClick={this.onDelete}
                    />
                  </span>
                :
                  <div className="col-xs-12 col-sm-6 card-paddings">
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-up 2x" />
                      <span>{upvotes || 0}</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-down 2x" />
                      <span>{downvotes || 0}</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-heart-o 2x" />
                      <span>{favoriteCount || 0}</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-eye 2x" />
                      <span>{views || 0}</span>
                    </span>
                  </div>
          }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardItem.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  apiDeleteFavoriteRecipe: PropTypes.func.isRequired
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    favorites: state.recipe.favorites,
  };
}

export default connect(
  mapStateToProps,
  { apiDeleteFavoriteRecipe }
)(CardItem);
