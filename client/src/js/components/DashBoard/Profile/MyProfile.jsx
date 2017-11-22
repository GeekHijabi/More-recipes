import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import CardItem from '../../Partials/CardItem';

const image = require('../../../../assets/images/beauty_profile.jpg');
/**
 *
 *
 * @className MyProfile
 * @extends {React.Component}
 */
class MyProfile extends React.Component {
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
      <div page="profile">
        <RecipeHeader />
        <main className="row prof-up">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <div className="container">
              <h1 className="name">Adetunji
                <br /> Hamdalah</h1>
              <p className="name-desc">Life-learner, Dreamer, Food-lover</p>
              <div className="red-border-line" />
              <h4>Bio</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ad delectus odio repudiandae dignissimos, iusto
          eos enim fuga, reiciendis vero eligendi perspiciatis alias praesentium voluptate iure tempore sint quam omnis.</p>
              <div className="social-icons">
                <a href="">
                  <i className="fa fa-twitter-square fa-2x" />
                </a>
                <a href=" ">
                  <i className="fa fa-instagram fa-2x" />
                </a>
                <a href="">
                  <i className="fa fa-pinterest-square fa-2x" />
                </a>
              </div>
            </div>
          </div>
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img src={image} alt="" className="bg" />
          </div>
        </main>
        <main id="list">
          <h4>
            <span>Favourited Recipes</span>
          </h4>
          <CardItem />
        </main>
        <Footer />
      </div>
    );
  }
}

export default MyProfile;
