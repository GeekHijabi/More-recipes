import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { apiLoginUser } from '../../actions/auth';
import validateSigninInput from '../../utils/validations/signinValidation';


/**
 * @class signIn
 * @extends {React.Component}
 */
export class SignIn extends React.Component {
  /**
   * @description Constructor function
   * @param {any} props
   * @memberof SignIn
   * @return {object} any
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      errorMessage: '',
      hasError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  /**
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {void}
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {void}
 */
  onClick(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
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
          if (err) {
            this.setState({
              hasError: true,
              errorMessage: err.response.data.error
            });
          }
        });
    }
  }

  /**
   *
   * @param {any} event
   * @memberof SignIn
  * @returns {void}
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
  * @memberof SignIn
  * @returns {object} event
  */
  isValid() {
    const { errors, isValid } = validateSigninInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @description constructor Function
   * @param {any} props
   * @memberof SignIn
   * @return {void}
   */
  render() {
    const { errors } = this.state;
    return (
      <div page="signin">
        <div className="overlay" />
        <div className="row">
          <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card card-style">
              <div className="card-body mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5" >
                    <strong>Sign in</strong>
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
                  <label htmlFor="Form-email1" className="form-label">
                  Username/Email
              <span style={{ color: 'red' }} > *</span>
                    <input
                      type="text"
                      className="Form-email1 form-control required"
                      placeholder="username or Email"
                      name="identifier"
                      onChange={this.onChange}
                      value={this.state.identifier}
                      required
                    />
                    {errors.identifier &&
                    <small
                      className="error-identifier"
                      style={{ color: '#A43741' }}
                    >
                      {errors.identifier }
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
                      placeholder="password"
                      name="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      pattern="(?=^.{8,15}$)(?!.*\s).*$"
                      title="8 to 15 characters required"
                      required
                    />
                    {errors.password &&
                    <small
                      className="error-password"
                      style={{ color: '#A43741' }}
                    >
                      {errors.password }
                    </small>}
                    <p
                      className="font-small
                      blue-text d-flex justify-content-end"
                    >
                      <Link
                        to="/forgot-password"
                        href="/forgot-password"
                        className="blue-text ml-1"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </label>
                </div>
                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-white btn-rounded submit float"
                    onClick={this.onClick}
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="modal-footer mx-5 pt-3 mb-1">
                <p className="font-small">Yet to Register?

              <Link to="/signup" href="./signup"> Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  apiLoginUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(null, { apiLoginUser })(SignIn);
