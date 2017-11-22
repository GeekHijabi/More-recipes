import React from 'react';

/**
 *
 *
 * @class signInForm
 * @extends {React.Component}
 */
class SignInForm extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof SignInForm
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
      <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5 form-elegant card">
        <div className="card-body mx-4">
          <div className="text-center">
            <h3 className="dark-grey-text mb-5" >
              <strong>Sign in</strong>
            </h3>
          </div>
          <div className="md-form">
            <label htmlFor="Form-email1">Username/Email
            <input
              type="text"
              id="Form-email1"
              className="form-control"
              placeholder="username or Email"
            />
            </label>
          </div>
          <div className="md-form pb-3">
            <label htmlFor="Form-pass1">Password
            <input
              type="password"
              id="Form-pass1"
              className="form-control"
              placeholder="password"
            />
            <p className="font-small blue-text d-flex justify-content-end">Forgot
                <a href="" className="blue-text ml-1">Password?</a>
            </p>
            </label>
          </div>
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn blue-gradient btn-white btn-block btn-rounded z-depth-1a"
            >
              Sign in
            </button>
          </div>
          <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
            or Sign in with:
          </p>
          <div className="row my-3 d-flex justify-content-center">
            <button type="button" className="btn btn-rounded mr-md-3 z-depth-1a">
              <i className="fa fa-facebook blue-text text-center" />
            </button>
            <button type="button" className="btn btn-rounded mr-md-3 z-depth-1a">
              <i className="fa fa-twitter blue-text" />
            </button>
            <button type="button" className="btn btn-rounded z-depth-1a">
              <i className="fa fa-google-plus blue-text" />
            </button>
          </div>
        </div>
        <div className="modal-footer mx-5 pt-3 mb-1">
          <p className="font-small grey-text d-flex justify-content-end">Not a member?
              <a href="./signup.html" className="blue-text ml-1">Sign Up</a>
          </p>
        </div>
      </div>
    );
  }
}
export default SignInForm;
