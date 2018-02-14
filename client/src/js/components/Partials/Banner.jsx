import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const image = require('../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class Banner extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @param {any} context
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClick = this.onClick.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof Banner
 */
  onClick(event) {
    event.preventDefault();
    this.props.history.push('/recipes');
  }
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <section id="banner">
        <img src={image} alt="" className="bg" />
        <div className="body-title-card">
          <h1 className="body-title">
              Life is too short for just a rough meal
          </h1>
          <button
            className="body-title-button"
            type="button"
            onClick={this.onClick}
          >
                  Try out one of our awesome recipes
          </button>
        </div>
      </section>
    );
  }
}
Banner.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
};


export default withRouter(Banner);
