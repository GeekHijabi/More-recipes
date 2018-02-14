import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-brand" href="/">
        <i className="fa fa-eercast" />
                        moreRecipe
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {localStorage.getItem('token') ? '' :
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/signin" className="nav-link btn" href="/signin">
            Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link btn" href="/signup">
            Sign up
            </Link>
          </li>
        </ul>
        }
      </div>
    </nav>
  </div>
);


export default Header;

