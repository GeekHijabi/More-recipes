import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

/**
 *
 *
 * @class SignUpForm
 * @extends {React.Component}
 */
class SignUpForm extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof SignUpForm
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof SignUpForm
   * @return {void}
   */
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 form-elegant card" onSubmit={this.SubmitForm}>
        <div className="card-body mx-4">
          <div className="text-center">
            <h3 className="dark-grey-text mb-5">
              <strong>Sign up</strong>
            </h3>
          </div>
          <div className="md-form">
            <label htmlFor="firstname">First Name
              <input type="text" id="firstname" className="form-control" placeholder="First Name" />
            </label>
          </div>

          <div className="md-form">
            <label htmlFor="lastname">Last Name
              <input type="text" id="lastname" className="form-control" placeholder="Last Name" />
            </label>
          </div>

          <div className="md-form">
            <label htmlFor="email">Email
              <input type="text" id="email" className="form-control" placeholder="email" />
            </label>
          </div>

          <div className="md-form">
            <label htmlFor="username">Username
            <input type="text" id="Form-username" className="form-control" placeholder="UserName" />
            </label>
          </div>

          <div className="md-form pb-3">
            <label htmlFor="password">Password
              <input type="password" id="password" className="form-control" placeholder="Password" />
            </label>
          </div>

          <div className="text-center mb-3">
            <button type="button" className="btn blue-gradient btn-white btn-block btn-rounded z-depth-1a">Sign up</button>
          </div>
          <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign up with:</p>

          <div className="row my-3 d-flex justify-content-center">
            <button type="button" className="btn btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-facebook blue-text text-center" /></button>
            <button type="button" className="btn btn-rounded mr-md-3 z-depth-1a"><i className="fa fa-twitter blue-text" /></button>
            <button type="button" className="btn btn-rounded z-depth-1a"><i className="fa fa-google-plus blue-text" /></button>
          </div>

        </div>
      </div>
    );
  }
}

export default SignUpForm;
