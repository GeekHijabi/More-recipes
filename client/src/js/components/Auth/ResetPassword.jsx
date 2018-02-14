import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import RecipeHeader from '../Partials/RecipeHeader';
import { apiResetPassword } from '../../actions/auth';
import
validateresetPasswordInput from
  '../../utils/validations/resetPasswordValidation';

/**
 * @class ResetPassword
 * @extends {React.Component}
 */
export class ResetPassword extends React.Component {
  /**
   * @description Constructor function
   * @param {any} props
   * @memberof SignIn
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   *
   * @param {any} event
   * @memberof ResetPassword
   * @returns {void}
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {any} event
   * @memberof ResetPassword
   * @returns {void}
 */
  onClick(event) {
    const baseUrl = window.location.href;
    const url = baseUrl.split('?token=');
    const currentURL = url[0];
    const userId = currentURL.split('/')[currentURL.split('/').length - 1];
    if (this.isValid()) {
      event.preventDefault();
      this.props.apiResetPassword(userId, this.state.newPassword, url[1])
        .then((data) => {
          toastr.options = {
            closeButton: true,
            progressBar: true
          };
          toastr.success(data.newPasswordMessage);
          this.props.history.push('/signin');
        })
        .catch((err) => {
          toastr.danger(err.data);
        });
    }
  }

  /**
  *
  * @param {any} event
  * @memberof ResetPassword
  * @returns {object} event
  */
  isValid() {
    const { errors, isValid } = validateresetPasswordInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @description Constructor function
   * @param {any} props
   * @memberof ResetPassword
   * @return {void}
   */
  render() {
    const { errors } = this.state;
    return (
      <div page="signin">
        <div className="overlay" />
        <RecipeHeader />
        <div className="card card-style">
          <div className="card-body mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-5" >
                <strong>Reset password</strong>
              </h3>
            </div>
            <div className="md-form">
              <label htmlFor="Form-email1" className="form-label">
                <input
                  type="password"
                  className="Form-email1 form-control"
                  placeholder="New Password"
                  name="newPassword"
                  onChange={this.onChange}
                  value={this.state.newPassword}
                  required
                />
                {errors.password &&
                <small style={{ color: '#A43741' }}>
                  {errors.password }
                </small>}
              </label>

              <label htmlFor="Form-email1" className="form-label">
                <input
                  type="password"
                  className="Form-email1 form-control"
                  placeholder="confirm Password"
                  name="confirmPassword"
                  onChange={this.onChange}
                  value={this.state.confirmPassword}
                  required
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
                className="btn btn-white btn-rounded"
                onClick={this.onClick}
              >
                        Reset password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ResetPassword.propTypes = {
  apiResetPassword: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};
export default connect(null, { apiResetPassword })(ResetPassword);
