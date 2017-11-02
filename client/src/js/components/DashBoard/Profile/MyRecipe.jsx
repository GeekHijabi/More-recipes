import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
// import CardItem from '../../Partials/CardItem';

const Image = require('../../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class MyProfile
 * @extends {React.Component}
 */
class MyRecipe extends React.Component {
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
        <main page="details" className="row">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img src={Image} alt="German Salad" className="food" />
            <h4>
              <span className="food_name">German Salad</span>
            </h4>
            <div className="food_vote">
              <span className="vote_type">
                <i className="fa fa-thumbs-o-up fa-2x" />
                <span>upvote</span>
              </span>
              <span className="vote_type">
                <i className="fa fa-thumbs-o-down fa-2x" />
                <span>downvote</span>
              </span>
              <span className="vote_type">
                <i className="fa fa-comments-o fa-2x" />
                <span>Reviews</span>
              </span>
            </div>
          </div>
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <ul className="nav nav-tabs white ">
              <li className="nav-item">
                <a className="nav-link" href="#ingredients" data-toggle="tab">Ingredients</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#steps" data-toggle="tab">Directions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews" data-toggle="tab">Reviews</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane steps active" id="steps">
                <div className="step">
                  <h5>Step 1</h5>
                  <p className="step_details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam eligendi ipsam distinctio numquam iste voluptate enim
              aspernatur consequuntur, et quia illum error iure quibusdam ea perferendis ex voluptatem pariatur!
                  </p>
                </div>
                <div className="step">
                  <h5>Step 2</h5>
                  <p className="step_details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam eligendi ipsam distinctio numquam iste voluptate enim
              aspernatur consequuntur, et quia illum error iure quibusdam ea perferendis ex voluptatem pariatur!
                  </p>
                </div>
                <div className="step">
                  <h5>Step 3</h5>
                  <p className="step_details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam eligendi ipsam distinctio numquam iste voluptate enim
              aspernatur consequuntur, et quia illum error iure quibusdam ea perferendis ex voluptatem pariatur!
                  </p>
                </div>
                <div className="step">
                  <h5>Step 4</h5>
                  <p className="step_details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam eligendi ipsam distinctio numquam iste voluptate enim
              aspernatur consequuntur, et quia illum error iure quibusdam ea perferendis ex voluptatem pariatur!
                  </p>
                </div>
                <div className="step">
                  <h5>Step 5</h5>
                  <p className="step_details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam eligendi ipsam distinctio numquam iste voluptate enim
              aspernatur consequuntur, et quia illum error iure quibusdam ea perferendis ex voluptatem pariatur!
                  </p>
                </div>
                <div className="step">
                  <h5>Step 6</h5>
                  <p className="step_details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam eligendi ipsam distinctio numquam iste voluptate enim
              aspernatur consequuntur, et quia illum error iure quibusdam ea perferendis ex voluptatem pariatur!
                  </p>
                </div>
              </div>

              <div className="tab-pane ingredients" id="ingredients">
                <ul>
                  <li>Water</li>
                  <li>cabbage</li>
                  <li>Tomato</li>
                </ul>

              </div>

              <div className="tab-pane reviews" id="reviews">
                <div>
                  <input type="text" name="" id="" />
                </div>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default MyRecipe;
