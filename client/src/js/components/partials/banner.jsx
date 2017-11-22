import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../styles/index.scss';

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
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
    };
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
                <a>Browse our collecton of Recipes</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Banner;
