import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {
  apiRegisterUser,
  apiLoginUser } from '../../actions/auth';

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
   * @memberof SignUp
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      errorMessage: '',
      password: '',
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
 * @memberof SignUp
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignUp
 */
  onClick(event) {
    event.preventDefault();
    this.props.apiRegisterUser(this.state).then(() => {
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
        })
        .catch((err) => {
          if (err && err.data) {
            this.setState({
              hasError: true,
              errorMessage: err.data.error
            });
          }
        });
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
   * @description Constructor Function
   * @param {any} props
   * @memberof SignUp
   * @return {void}
   */
  render() {
    return (
      <div page="signup">
        <div className="overlay" />
        <main className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img src={image} alt="" className="bg" />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-6 col-lg-5 form-elegant card"
          >
            <div className="card-body mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign up</strong>
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
                <label htmlFor="Form-email1">firstname
                  <input
                    type="text"
                    id="Form-email1"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    onChange={this.onChange}
                    value={this.state.firstName}
                    required
                  />
                </label>
              </div>

              <div className="md-form">
                <label htmlFor="Form-email1">lastname
                  <input
                    type="text"
                    id="Form-email1"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    required
                  />
                </label>
              </div>

              <div className="md-form">
                <label htmlFor="Form-email1">email
                  <input
                    type="text"
                    id="Form-email1"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    required
                  />
                </label>
              </div>

              <div className="md-form">
                <label htmlFor="Form-email1">username
                <input
                  type="text"
                  id="Form-email1"
                  className="form-control"
                  placeholder="UserName"
                  name="userName"
                  onChange={this.onChange}
                  value={this.state.userName}
                  pattern="(?=^.{2,15}$)(?!.*\s).*$"
                  title="2 to 15 characters required"
                  required
                />
                </label>
              </div>

              <div className="md-form pb-3">
                <label htmlFor="Form-pass1">password
                  <input
                    type="password"
                    id="Form-pass1"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    pattern="(?=^.{8,15}$)(?!.*\s).*$"
                    title="8 to 15 characters required"
                    required
                  />
                </label>
              </div>

              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn blue-gradient btn-white btn-block btn-rounded z-depth-1a"
                  onClick={this.onClick}
                >
                Sign up
                </button>
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign up with:</p>

              <div className="row my-3 d-flex justify-content-center">
                <button type="button" className="btn btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-facebook blue-text text-center" /></button>
                <button type="button" className="btn btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-twitter blue-text" /></button>
                <button type="button" className="btn btn-rounded z-depth-1a"><i className="fa fa-google-plus blue-text" /></button>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }
}

SignUp.propTypes = {
  apiRegisterUser: PropTypes.func.isRequired,
  apiLoginUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired
};

export default connect(null, { apiRegisterUser, apiLoginUser })(SignUp);
