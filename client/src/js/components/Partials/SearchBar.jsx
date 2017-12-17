import React from 'react';

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */

class SearchBar extends React.Component {

  render() {
    return (
      <div>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
