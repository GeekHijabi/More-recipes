import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { LogoutUser } from '../../actions/auth';

/**
 *
 * *
 * @class Header
 * @extends {React.Component}
 */
export class RecipeHeader extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClick = this.onClick.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof EditProfileModal
 */
  onClick(event) {
    event.preventDefault();
    this.props.LogoutUser();
    this.props.history.push('/');
  }
  /**
   *
   *@return {dom} DomElement
   *
   */
  render() {
    const url = window.location.href;
    const currentURL = url.split('/')[url.split('/').length - 1];

    return (
      <nav className="navbar bg-success navbar-expand-lg">
        <Link to="/" href="/" className="navbar-brand text-white">
          <i className="fa fa-eercast" /> More Recipe
        </Link>
        {currentURL === 'recipes' ? <SearchBar /> : ''}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ cursor: 'pointer', color: 'white' }}
          >
            <i
              className="fa fa-bars 4x"
            />
          </span>
        </button>
        {localStorage.getItem('token') ?
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-link text-white"
                  href="/profile"
                  title="User's profile"
                >
                  <i className="fa fa-user-circle-o fa-2x" />
                </Link>
              </li>

              <div className="nav-item dropdown">
                <a
                  href="/"
                  className="nav-link text-white dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                Menu
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link
                    to="/recipes"
                    className="dropdown-item"
                    href="/recipes"
                  >
                    <i className="fa fa-cutlery fa-1x" /> Recipes
                  </Link>
                  <Link
                    to="/admin"
                    className="dropdown-item"
                    href="/profile"
                  >
                    <i className="fa fa-user-o fa-1x" /> My Recipes
                  </Link>
                  <Link
                    to="/favorites"
                    className="dropdown-item"
                    href="/favorites"
                  >
                    <i className="fa fa-gratipay fa-1x" /> My favorites
                  </Link>
                  <Link
                    to="/"
                    className="dropdown-item"
                    href="/"
                    onClick={this.onClick}
                  >
                    <i className="fa fa-sign-out" /> Logout
                  </Link>
                </div>
              </div>
            </ul>
          </div>
        : '' }
      </nav>
    );
  }
}
RecipeHeader.propTypes = {
  LogoutUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired

};

export default withRouter(connect(null, { LogoutUser })(RecipeHeader));
