import React from 'react';
import SearchBar from './SearchBar';
import ResultList from './ResultList';


/**
 *
 *
 * @class SearchField
 * @extends {React.Component}
 */
class SearchField extends React.Component {
/**
* @description Constructor Function
* @param {any} props
* @memberof SearchField
* @return {void}
*/
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /**
* @description Constructor Function
* @param {any} props
* @memberof SearchField
* @return {void}
*/
  render() {
    return (
      <div>
        <SearchBar />
        <ResultList />
      </div>
    );
  }
}

export default SearchField;
