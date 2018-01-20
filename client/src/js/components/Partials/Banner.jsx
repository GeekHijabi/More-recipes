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
      <div>
        <section id="banner" className="row">
          <img src={image} alt="" className="bg" />
          <div className="container">
            <div className="card card-body">
              <h1>Life is too short for just a rough meal</h1>
              <p className="btn">
                <button
                  type="button"
                  onClick={this.onClick}
                >
                Browse our collecton of Recipes
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// Banner.contextTypes = {
//   router: React.PropTypes.func.isRequired,
// };

Banner.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
};


export default withRouter(Banner);
