import React from 'react';
import CardItem from '../CardItem';


/**
 *
 *
 * @class SearchBar
 * @extends {React.Component}
 */
class ResultLists extends React.Component {
/**
 *
 *@param {object} props
 * @returns {null} void
 * @memberof SearchBar
 */
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: '',
      Displayed: this.props.recipes
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignIn
 */
  onInputChange(event) {
    this.setState({
      SearchResults: event.target.value,
      Displayed
    });
    console.log('Here', this.state);
  }


  /**
 *
 *
 * @class SearchBar
 * @extends {React.Component}
 */
  render() {
    return (
      <li>Here</li>
    //   this.state.Displayed.map(recipes => (<CardItem
    //     key={recipes.id}
    //     recipeName={this.props.recipeName}
    //   />
    //   ))
    );
  }
}


export default ResultLists;


// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// class ResultList extends Component {
//   render() {
//     return (
//       <ul>
//         <li>Nome</li>
//       </ul>
//     );
//   }
// }

// export default ResultList;
