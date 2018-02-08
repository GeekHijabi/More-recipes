import React from 'react';
import '../../../styles/index.scss';

/**
 *
 *
 * @class Footer
 * @extends {React.Component}
 */
export class Footer extends React.Component {
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
        <div className="footer-copyright">
              © 2017 copyright: morerecipes27@gmail.com
        </div>
        <div className="footer-copyright">
             Made by: Hamdalah Adetunji
        </div>
      </footer>
    );
  }
}

export default Footer;
