import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { apiLoginUser } from '../../actions/auth';

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
   * @memberof SignIn
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errorMessage: '',
      hasError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignIn
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignIn
 */
  onClick(event) {
    event.preventDefault();
    this.props.apiLoginUser(this.state)
      .then((res) => {
        if (res && res.data) {
          toastr.options = {
            closeButton: true,
            progressBar: true
          };
          toastr.success(res.data.message);
          this.props.history.push('/recipes');
        }
      }).catch((err) => {
        if (err && err.response) {
          this.setState({
            hasError: true,
            errorMessage: err.response.data.error
          });
        }
      });
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignUp
 */
  onDismiss(event) {
    event.preventDefault();
    this.setState({
      hasError: false,
      errorMessage: ''
    });
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
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5 form-elegant card">
            <div className="card-body mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5" >
                  <strong>Sign in</strong>
                </h3>
              </div>
              { this.state.hasError && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {this.state.errorMessage}
                  <button
                    type="button"
                    className="close"
                    onClick={this.onDismiss}
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              <div className="md-form">
                <label htmlFor="Form-email1">Username/Email
            <input
              type="text"
              id="Form-email1"
              className="form-control"
              placeholder="username or Email"
              name="identifier"
              onChange={this.onChange}
              value={this.state.identifier}
              required
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
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              pattern="(?=^.{8,15}$)(?!.*\s).*$"
              title="8 to 15 characters required"
              required
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
                  onClick={this.onClick}
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
        </main>
      </div>
    );
  }
}
SignIn.propTypes = {
  apiLoginUser: PropTypes.func.isRequired,
};

export default connect(null, { apiLoginUser })(SignIn);
