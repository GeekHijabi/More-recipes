import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {
  apiRegisterUser,
  apiLoginUser } from '../../actions/auth';
import validateSignupInput from '../../utils/validations/signupValidation';


/**
 * @class SignUp
 * @extends {React.Component}
 */
export class SignUp extends React.Component {
  /**
   * @description constructor function
   * @param {any} props
   * @memberof SignUp
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      hasError: false,
      errorMessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  /**
  *
  * @param {any} event
  * @memberof SignUp
  * @returns {object} event
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {any} event
   * @memberof SignUp
   * @returns {object} event
  */
  onClick(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.apiRegisterUser(this.state).then(() => {
        this.props.apiLoginUser(this.state)
          .then((res) => {
            if (res) {
              toastr.options = {
                closeButton: true,
                progressBar: true
              };
              toastr.success(res.data.message);
              this.props.history.push('/recipes');
            }
          })
          .catch((err) => {
            this.setState({
              hasError: true,
              errorMessage: err.response.data.error
            });
          });
      })
        .catch((err) => {
          this.setState({
            hasError: true,
            errorMessage: err.response.data.error
          });
        });
    }
  }

  /**
   *
   * @memberof SignUp
   * @param {any} event
  * @returns {object} event
  */
  onDismiss(event) {
    event.preventDefault();
    this.setState({
      errors: {}
    });
  }


  /**
  *
  * @param {any} event
  * @memberof SignUp
  * @returns {object} event
  */
  isValid() {
    const { errors, isValid } = validateSignupInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @description render function
   * @param {any} props
   * @memberof SignUp
   * @return {object} signup
   */
  render() {
    const { errors } = this.state;
    return (
      <div page="signup">
        <div className="overlay" />
        <div className="row">
          <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div
              className="card card-style"
            >
              <div className="card-body mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign up</strong>
                  </h3>
                </div>
                {this.state.hasError && (
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
                  <label htmlFor="Form-email1" className="form-label">Username
                <span style={{ color: 'red' }} > *</span>
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
                    {errors.userName &&
                    <small style={{ color: '#A43741' }}>
                      {errors.userName }
                    </small>}
                  </label>
                </div>

                <div className="md-form">
                  <label htmlFor="Form-email1" className="form-label">Email
                <span style={{ color: 'red' }} > *</span>
                    <input
                      type="text"
                      className="Form-email1 form-control"
                      placeholder="jane@doe.com"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      required
                    />
                    {errors.email &&
                    <small style={{ color: '#A43741' }}>
                      {errors.email }
                    </small>}
                  </label>
                </div>

                <div className="md-form pb-3">
                  <label htmlFor="Form-pass1" className="form-label">Password
                <span style={{ color: 'red' }} > *</span>
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
                    {errors.password &&
                    <small style={{ color: '#A43741' }}>
                      {errors.password }
                    </small>}
                  </label>
                </div>

                <div className="md-form pb-3">
                  <label htmlFor="Form-pass2" className="form-label">
                  Confirm Password
                <span style={{ color: 'red' }} > *</span>
                    <input
                      type="password"
                      id="Form-pass2"
                      className="form-control"
                      placeholder="********"
                      name="confirmPassword"
                      onChange={this.onChange}
                      value={this.state.confirmPassword}
                      pattern="(?=^.{8,15}$)(?!.*\s).*$"
                      title="8 to 15 characters required"
                    />
                    {errors.confirmPassword &&
                    <small style={{ color: '#A43741' }}>
                      {errors.confirmPassword }
                    </small>}
                  </label>
                </div>

                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-white btn-rounded float"
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
