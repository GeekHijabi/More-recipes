import React from 'react';

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
                <button onClick={this.onClick}>Browse our collecton of Recipes</button>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Banner;
