import React from 'react';

const ForgotPassword = () => (
  <div page="signin">
    <div className="overlay" />
    <div className="card card-style">
      <div className="card-body mx-4">
        <div className="text-center">
          <h3 className="dark-grey-text mb-5" >
            <strong>Forgot password?</strong>
          </h3>
        </div>
        <div className="md-form">
          <label htmlFor="Form-email1" className="form-label">Email
            <input
              type="text"
              className="Form-email1 form-control"
              placeholder="Email"
              name="identifier"
            //   onChange={this.onChange}
            //   value={this.state.identifier}
              required
            />
          </label>
        </div>
        <div className="text-center mb-3">
          <button
            type="button"
            className="btn btn-white btn-rounded"
            // onClick={this.onClick}
          >
                        Submit
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ForgotPassword;
