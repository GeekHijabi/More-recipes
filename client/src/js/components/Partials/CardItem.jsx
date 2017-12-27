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
        views
      }
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <img className="card-img-top food-image" src={imageUrl || image} alt="Card cap" style={{ height: '200px' }} />
          <div className="card-body">
            <h4 className="card-title">{recipeName}</h4>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <Link
                  className="btn btn-primary"
                  to={`/recipe/${id}`}
                  href={`/recipe/${id}`}
                >
                  View More
                </Link>
              </div>
              <div className="col-xs-12 col-sm-6">
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
                  <span>{views || 0}</span>
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

