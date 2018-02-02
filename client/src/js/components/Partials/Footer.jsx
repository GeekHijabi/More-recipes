import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../styles/index.scss';

/**
 *
 *
 * @class Footer
 * @extends {React.Component}
 */
class Footer extends React.Component {
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
  }
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footer-socials mb-5 flex-center">
                <a className="icons-sm fb-ic" href="/">
                  <i className="fa fa-facebook fa-lg white-text mr-md-4" />
                </a>
                <a className="icons-sm tw-ic" href="/">
                  <i className="fa fa-twitter fa-lg white-text mr-md-4" />
                </a>
                <a className="icons-sm ins-ic" href="/">
                  <i className="fa fa-instagram fa-lg white-text mr-md-4" />
                </a>
                <a className="icons-sm pin-ic" href="/">
                  <i className="fa fa-pinterest fa-lg white-text" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container-fluid">
              © 2017 Copyright: Morerecipes.com
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
