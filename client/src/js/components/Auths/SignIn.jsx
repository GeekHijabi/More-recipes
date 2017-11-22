import React from 'react';
import SignInForm from './SignInForm';

const image = require('../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class signIn
 * @extends {React.Component}
 */
class SignIn extends React.Component {
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
      <div page="signup">
        <div className="overlay" />
        <main className="row">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img src={image} alt="" className="bg" />
          </div>
          <SignInForm />
        </main>
      </div>
    );
  }
}

export default SignIn;
