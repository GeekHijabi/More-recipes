import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from 'reactstrap';
import '../../../styles/index.scss';
/**
 * 
 * 
=======
import 'bootstrap/dist/css/bootstrap.css';
// import Button  from 'reactstrap';
import '../../../styles/index.scss';
import SearchBar from '../Partials/SearchBar';

/**
 * 
 * *
>>>>>>> 4d6fd913656271b0926a670b2c6af06bec95200a
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
<<<<<<< HEAD
/**
* @return {dom} DomElement
*/
=======
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
>>>>>>> 4d6fd913656271b0926a670b2c6af06bec95200a
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
<<<<<<< HEAD
          <a className="navbar-brand" href="#">
                    <i className="fa fa-eercast" />
=======
          <a className="navbar-brand" href="">
            <i className="fa fa-eercast" />
>>>>>>> 4d6fd913656271b0926a670b2c6af06bec95200a
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
<<<<<<< HEAD
            <form className="form-inline">
              <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
              />
            </form>
=======
            <SearchBar />
>>>>>>> 4d6fd913656271b0926a670b2c6af06bec95200a
          </div>
        </nav>
      </div>
    );
  }
}

<<<<<<< HEAD
ReactDOM.render(
  <Header />,);

=======
export default Header;
>>>>>>> 4d6fd913656271b0926a670b2c6af06bec95200a
