import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from 'reactstrap';
import '../../../styles/index.scss';
/**
 * 
 * 
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
/**
* @return {dom} DomElement
*/
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">
                    <i className="fa fa-eercast" />
                        moreRecipe
          </a>
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
                <a className="nav-link" href="./signin.html">Sign in</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn cornflowerblue" href="./signup.html">Sign up</a>
              </li>
            </ul>
            <form className="form-inline">
              <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
              />
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;

