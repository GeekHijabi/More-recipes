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
class Card extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      active: true
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
        <section id="list" className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
            <h4>
              <span>This Week&rsquo;s Handpicked Recipes</span>
            </h4>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
              <img className="card-img-top" src={image} alt="Card cap" />
              <div className="card-body">
                <h4 className="card-title">German Sprinkle Sauce</h4>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <a href="#" className="btn btn-primary">view more</a>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-up" />
                      <span>233</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-down" />
                      <span>41</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
              <img className="card-img-top" src={image} alt="Card cap" />
              <div className="card-body">
                <h4 className="card-title">German Sprinkle Sauce</h4>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <a href="#" className="btn btn-primary">view more</a>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-up" />
                      <span>233</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-down" />
                      <span>41</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
              <img className="card-img-top" src={image} alt="Card cap" />
              <div className="card-body">
                <h4 className="card-title">German Sprinkle Sauce</h4>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <a href="#" className="btn btn-primary">view more</a>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-up" />
                      <span>233</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-down" />
                      <span>41</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
              <img className="card-img-top" src={image} alt="Card cap" />
              <div className="card-body">
                <h4 className="card-title">German Sprinkle Sauce</h4>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <a href="#" className="btn btn-primary">view more</a>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-up" />
                      <span>233</span>
                    </span>
                    <span className="ratings">
                      <i className="fa fa-thumbs-o-down" />
                      <span>41</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Card;

