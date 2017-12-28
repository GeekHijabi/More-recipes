import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiSearchRecipe } from '../../actions/recipe';


/**
 *
 *
 * @class SearchBar
 * @extends {React.Component}
 */
class SearchBar extends React.Component {
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
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof SignIn
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.apiSearchRecipe(event.target.value);
  }


  /**
 *
 *
 * @class SearchBar
 * @extends {React.Component}
 */
  render() {
    return (
      <div className="search">
        <div className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            id="search-bar"
            name="SearchResults"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onChange}
            value={this.state.SearchResults}
          />
        </div>
      </div>
    );
  }
}
SearchBar.propTypes = {
  apiSearchRecipe: PropTypes.func.isRequired,
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    SearchResults: state.recipe,
  };
}


export default connect(
  mapStateToProps,
  {
    apiSearchRecipe
  }
)(SearchBar);
