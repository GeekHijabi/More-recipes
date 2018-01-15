import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import RecipeHeader from '../Partials/RecipeHeader';
import CardItem from '../Partials/CardItem';
import PopularRecipe from '../Partials/PopularRecipe';
import Footer from '../Partials/Footer';
import { apiGetRecipe } from '../../actions/recipe';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
class Recipes extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Recipes
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof Recipes
 */
  componentDidMount() {
    this.props.apiGetRecipe(8);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     recipes: nextProps.recipes,
  //     page: nextProps.recipes.page,
  //   });
  // }


  /**
 * @returns {void}
 *
 * @param {any} data
 * @memberof Recipes
 */
  onPageChange(current) {
    console.log('page', current);
    current.selected += 1;
    this.props.apiGetRecipe(2);
  }

  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes, search, page } = this.props;
    const recipeList = search.length === 0 ? recipes : search;
    return (
      <div>
        <RecipeHeader />
        <div className="row container-fluid mv-card">

          {recipeList.length === 0 && (<span>No recipe yet!</span>)}
          {recipeList.map(recipe =>
            <CardItem recipe={recipe} key={recipe.id} />)}
        </div>
        <ReactPaginate
          pageCount={this.state.page}
          pageRangeDisplayed={5}
          marginPagesDisplayed={3}
          previousLabel="Previous"
          nextLabel="Next"
          breakClassName="text-center"
          initialPage={0}
          containerClassName="container pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item active"
          previousClassName="page-item"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          onPageChange={this.onPageChange}
        />
        <PopularRecipe />
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  apiGetRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any),
  search: PropTypes.arrayOf(PropTypes.any).isRequired,
  page: PropTypes.number.isRequired
};

Recipes.defaultProps = {
  recipes: []
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  console.log('msp', state);
  return {
    recipes: state.recipe.recipes,
    search: state.recipe.SearchResults,
    page: state.recipe.page
  };
}

export default connect(mapStateToProps, { apiGetRecipe })(Recipes);
