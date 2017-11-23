import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiRegisterUser } from '../../actions/auth';

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
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /**
 * @returns {void}
 *
 * @param {any} e
 * @memberof SignUp
 */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
 * @returns {void}
 *
 * @param {any} e
 * @memberof SignUp
 */
  onClick(e) {
    e.preventDefault();
    // axios.post('http://localhost:3000/api/v1/user/signup', { user: this.state });
    this.props.apiRegisterUser(this.state);
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
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 form-elegant card">
            <div className="card-body mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5"><strong>Sign up</strong></h3>
              </div>
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
};

export default connect(null, { apiRegisterUser })(SignUp);
