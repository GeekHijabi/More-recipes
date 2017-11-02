import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import Button  from 'reactstrap';
import '../../../styles/index.scss';
import SearchBar from '../Partials/SearchBar';

/**
 * 
 * *
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
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
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="">
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
            <SearchBar />
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
