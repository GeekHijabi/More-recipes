import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { LogoutUser } from './actions/auth';


const secret = process.env.SECRETKEY;

/** Checkes if a user has a token,
   * if token, checks if token is correct or expired
   *
   * @export {function} ConfirmAuth
   *
   * @param {any} ComposedComponent
   *
   * @returns {React.Component} rendered component
   */
export default function (ComposedComponent) {
  /** High order component to protect routes
   *
   * @class Authorize
   *
   * @extends {React.Component}
   */
  class Authorize extends Component {
    /** checks and validates user token
     *
     * @memberof Home
     *
     * @return {void}
     */
    componentWillMount() {
      if (!this.props.auth.isAuthenticated) {
        this.context.router.history.push('/');
      }

      const { token } = localStorage;
      if (token) {
        jwt.verify(token, secret, (error) => {
          if (error) {
            swal({
              text: 'Your Session Expired, Please Sign In',
              icon: 'error',
              button: 'Got It!',
              dangerMode: true
            }).then(() => {
              this.props.LogoutUser();
              this.context.router.history.push('/signin');
            });
          }
        });
      } else {
        this.context.router.history.push('/');
        this.props.LogoutUser();
      }
    }
    /** html component to render
     *
     * @memberof Home
     *
     * @return {void}
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  Authorize.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    LogoutUser: PropTypes.func.isRequired
  };
  Authorize.contextTypes = {
    router: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  return connect(mapStateToProps, { LogoutUser })(Authorize);
}
