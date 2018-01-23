import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof CardItem
 */

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
        favoriteCount
      }
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card card-shape">
          <img
            className="card-img-top food-image"
            src={imageUrl || image}
            alt="Card cap"
            style={{ height: '180px' }}
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
              <div className="col-xs-12 col-sm-6 card-paddings">
                <span className="ratings">
                  <i className="fa fa-thumbs-o-up 2x" />
                  <span>{upvotes || 0}</span>
                </span>
                <span className="ratings">
                  <i className="fa fa-thumbs-o-down 2x" />
                  <span>{downvotes || 0}</span>
                </span>
                <span className="ratings favRite">
                  <i className="fa fa-heart-o 2x" />
                  <span>{favoriteCount || 0}</span>
                </span>
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
};

export default CardItem;

