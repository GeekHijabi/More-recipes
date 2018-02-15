import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import RecipeHeader from '../Partials/RecipeHeader';
import { apiForgotPassword } from '../../actions/auth';
import
validateforgotPasswordInput from
  '../../utils/validations/forgotPasswordValidation';

/**
 * @class ForgotPassword
 * @extends {React.Component}
 */
export class ForgotPassword extends React.Component {
  /**
   * @description Constructor function
   * @param {any} props
   * @memberof SignIn
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   *
   * @param {any} event
   * @memberof ForgotPassword
   * @returns {void}
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {any} event
   * @memberof ForgotPassword
   * @returns {void}
 */
  onClick(event) {
    if (this.isValid()) {
      event.preventDefault();
      this.props.apiForgotPassword(this.state.email)
        .then((res) => {
          toastr.options = {
            closeButton: true,
            progressBar: true
          };
          toastr.success(res.data.message);
          this.props.history.push('/signin');
        })
        .catch((err) => {
          toastr.danger(err.data);
        });
      this.setState({ email: '' });
    }
  }

  /**
  *
  * @param {any} event
  * @memberof SignUp
  * @returns {object} event
  */
  isValid() {
    const { errors, isValid } = validateforgotPasswordInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @description Constructor function
   * @param {any} props
   * @memberof ForgotPassword
   * @return {void}
   */
  render() {
    const { errors } = this.state;
    return (
      <div page="signin">
        <div className="overlay" />
        <RecipeHeader />
        <div className="card card-style reset-card">
          <div className="card-body mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-4" >
                <strong>Forgot password?</strong>
              </h3>
              <span className="mb-3 reset-text">No worries!
              Input your email address below and we will send you
              reset information
              </span>
            </div>
            <div className="md-form">
              <label htmlFor="Form-email1" className="form-label">
                <input
                  type="text"
                  id="Form-email1"
                  className="form-control"
                  placeholder="Email"
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
            <div className="text-center mb-3">
              <button
                type="button"
                className="btn btn-white btn-rounded"
                onClick={this.onClick}
              >
                       Send me an instruction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  apiForgotPassword: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};
export default connect(null, { apiForgotPassword })(ForgotPassword);
