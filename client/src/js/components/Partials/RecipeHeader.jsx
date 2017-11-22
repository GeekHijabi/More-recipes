import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import Button  from 'reactstrap';
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
      active: true
    };
  }
  /**
   *
   *@return {dom} DomElement
   *
   */
  render() {
    return (
      <div>
        <section className="recipe-header">
          <header>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
              <a href="index.html" className="navbar-brand text-white">
                <i className="fa fa-eercast" /> More Recipe</a>
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
                    <a className="nav-link text-white" href="./favourite.html" title="favourite Recipes">
                      <i className="fa fa-cutlery fa-2x" />
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link text-white dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-user-circle-o fa-2x" />
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" aria-labelledby="dropdownMenuButton">
                        <a className="" href="./profile.html">Profile</a>
                      </li>
                      <li className="dropdown-item" aria-labelledby="dropdownMenuButton">
                        <a className="" href="./index.html">Logout</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </section>

      </div>
    );
  }
}

export default RecipeHeader;
