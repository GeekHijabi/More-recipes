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
      active: true
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
      <div>
        <footer className="page-footer indigo center-on-small-only pt-0">

          <div className="container">

            <div className="row">

              <div className="col-md-12">

                <div className="footer-socials mb-5 flex-center">

                  <a className="icons-sm fb-ic">
                    <i className="fa fa-facebook fa-lg white-text mr-md-4" />
                  </a>
                  <a className="icons-sm tw-ic">
                    <i className="fa fa-twitter fa-lg white-text mr-md-4" />
                  </a>
                  <a className="icons-sm ins-ic">
                    <i className="fa fa-instagram fa-lg white-text mr-md-4" />
                  </a>
                  <a className="icons-sm pin-ic">
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
      </div>
    );
  }
}

export default Footer;
