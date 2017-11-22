import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import './../styles/index.scss';

// const image = require('../assets/images/banner_bg.jpg');

/**
 * @description Displays Home View
 * @class Home
 * @extends {React.Component}
 * @param {any} props
 */
class Home extends React.Component {
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
   * @return {dom} DomElement
   */
  render() {
    return (
      <div>
        <h1>I am Home</h1>
        <h2>Render Image</h2>
        <img src={image} alt="banner" />
        <Button color="success">click me</Button>
      </div>
    );
  }
}

export default Home;
