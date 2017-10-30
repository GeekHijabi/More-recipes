import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { button } from 'reactstrap';
import '../../../styles/index.scss';

const image = require('../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class SignUp
 * @extends {React.Component}
 */
class SignUp extends React.Component {
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
        <body page="signup">
          <div className="overlay" />
          <main className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-7">
              <img src={image} alt="" className="bg" />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 form-elegant card">
              <div className="card-body mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong>Sign up</strong></h3>
                </div>
                <div className="md-form">
                  <label htmlFor="Form-email1">First Name</label>
                  <input type="text" id="Form-email1" className="form-control" placeholder="First Name" />

                </div>

                <div className="md-form">
                  <label htmlFor="Form-email1">Last Name</label>
                  <input type="text" id="Form-email1" className="form-control" placeholder="last Name" />

                </div>

                <div className="md-form">
                  <label htmlFor="Form-email1">Email</label>
                  <input type="text" id="Form-email1" className="form-control" placeholder="email" />

                </div>

                <div className="md-form">
                  <label htmlFor="Form-email1">Username</label>
                  <input type="text" id="Form-email1" className="form-control" placeholder="username" />

                </div>

                <div className="md-form pb-3">
                  <label htmlFor="Form-pass1">Password</label>
                  <input type="password" id="Form-pass1" className="form-control" placeholder="password" />
                </div>

                <div className="text-center mb-3">
                  <button type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a"><a href="./index.html">Sign up</a></button>
                </div>
                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign up with:</p>

                <div className="row my-3 d-flex justify-content-center">
                  <button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-facebook blue-text text-center" /></button>
                  <button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-twitter blue-text" /></button>
                  <button type="button" className="btn btn-white btn-rounded z-depth-1a"><i className="fa fa-google-plus blue-text" /></button>
                </div>

              </div>
            </div>
          </main>
        </body>
      </div>
    );
  }
}

export default SignUp;

