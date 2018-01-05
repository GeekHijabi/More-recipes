import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

/**
 *
 * *
 * @class Header
 * @extends {React.Component}
 */
class RecipeHeader extends React.Component {
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
    // console.log(localStorage.token);
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  /**
   *
   *@return {dom} DomElement
   *
   */
  render() {
    return (
      <nav className="navbar bg-success navbar-expand-lg">
        <Link to="/" href="/" className="navbar-brand text-white">
          <i className="fa fa-eercast" /> More Recipe
        </Link>
        <SearchBar />
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white" href="/" title="favourite Recipes">
                <i className="fa fa-gratipay fa-2x" />
              </Link>
            </li>

            <div className="nav-item dropdown">
              <a href="/" className="nav-link text-white dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link to="/profile" className="dropdown-item" href="/profile"><i className="fa fa-user-circle-o fa-1x" /> Profile</Link>
                <Link to="/recipes" className="dropdown-item" href="/recipes"><i className="fa fa-cutlery fa-1x" /> Recipes</Link>
                <Link
                  to="/"
                  className="dropdown-item"
                  href="/"
                  onClick={this.onClick}
                >
                  <i className="fa fa-sign-out"
                  />
                Logout
                </Link>
                <Link to="/admin" className="dropdown-item" href="/profile"><i className="fa fa-user-o fa-1x" /> MyRecipes</Link>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default RecipeHeader;
