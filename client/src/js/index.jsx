import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router-dom';

import './../styles/index.scss';
// import Header from './components/partials/header';
// import NotFound from './components/notfound';
import Home from './sample';
console.log('Hey')
/**
 * 
 * 
 * @class Header
 * @extends {React.Component}
 */
class Index extends React.Component {
/**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void} 
   */
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     active: true
  //   };
  // }
  /**
   * 
   * 
   *@return {dom} DomElement
   * @memberof Header
   */
  render() {
    return (
      <BrowserRouter>
        <div id="main">
          <Match exactly pattern="/" component={Home} />
          {/* <Match pattern="/sample" component={Home} /> */}
          {/* <Miss component={NotFound} /> */}

        </div>
      </BrowserRouter>
    );
  }
}
console.log('ho ho ho!xmas is here')

export default Index;
