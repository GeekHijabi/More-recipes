import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {
  apiRegisterUser,
  apiLoginUser } from '../../actions/auth';


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
            this.props.history.push('/profile');
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
        <div>
          <div
            className="card card-style"
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
                <label htmlFor="Form-email1" className="form-label">First name
                  <input
                    type="text"
                    className="Form-email1 form-control"
                    placeholder="Jane"
                    name="firstName"
                    onChange={this.onChange}
                    value={this.state.firstName}
                    required
                  />
                </label>
              </div>

              <div className="md-form">
                <label htmlFor="Form-email1" className="form-label">Last name
                  <input
                    type="text"
                    className="Form-email1 form-control"
                    placeholder="Doe"
                    name="lastName"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    required
                  />
                </label>
              </div>

              <div className="md-form">
                <label htmlFor="Form-email1" className="form-label">Email
                  <input
                    type="text"
                    className="Form-email1 form-control"
                    placeholder="jane@doe.com"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    required
                  />
                </label>
              </div>

              <div className="md-form">
                <label htmlFor="Form-email1" className="form-label">Username
                <input
                  type="text"
                  className="Form-email1 form-control"
                  placeholder="janedoe"
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
                <label htmlFor="Form-pass1" className="form-label">Password
                  <input
                    type="password"
                    id="Form-pass1"
                    className="form-control"
                    placeholder="********"
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
                  className="btn btn-white btn-rounded"
                  onClick={this.onClick}
                >
                Sign up
                </button>
              </div>
            </div>
            <div className="modal-footer mx-5 pt-3 mb-1">
              <p className="font-small">
                Have an account?
                <Link to="/signin" href="/signin" className="blue-text ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  apiRegisterUser: PropTypes.func.isRequired,
  apiLoginUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(null, { apiRegisterUser, apiLoginUser })(SignUp);
