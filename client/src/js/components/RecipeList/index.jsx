import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { RingLoader } from 'react-spinners';
import RecipeHeader from '../Partials/RecipeHeader';
import CardItem from '../Partials/CardItem';
import PopularRecipe from '../Partials/PopularRecipe';
import Footer from '../Partials/Footer';
import { apiGetRecipe, searchItem } from '../../actions/recipe';

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
    this.props.apiGetRecipe();
  }

  /**
   * @description COnstructor Function
   * @param {any} nextProps
   * @memberof Recipes
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.pageCount
    });
  }


  /**
 * @returns {void}
 *
 * @param {any} current
 * @memberof Recipes
 */
  onPageChange(current) {
    current.selected += 1;
    this.props.apiGetRecipe(current.selected);
  }

  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes, search, searchValue } = this.props;
    const recipeList = (search.length === 0) && !searchValue ? recipes : search;
    return (
      <div>
        <RecipeHeader />
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 headings">
          <h4>
            <span>Recipes</span>
          </h4>
        </div>
        <div className="row container-fluid mv-card">
          {this.props.isLoadingRecipe ? <RingLoader
            color="#B0C038"
            loading={this.props.isLoadingRecipe}
          /> :
          recipeList.map(recipe =>
            <CardItem recipe={recipe} key={recipe.id} />)
          }
          {
            recipeList.length === 0 && (search.length === 0 && searchValue ?
              <span className="styleText">
                No search found! Clear the seach bar to get more recipes
              </span>
          :
              <span className="styleText">
                No recipes yet, Come back soon for amazing recipes!
              </span>)
          }
        </div>
        <ReactPaginate
          pageCount={this.state.page}
          pageRangeDisplayed={5}
          marginPagesDisplayed={3}
          previousLabel="Previous"
          nextLabel="Next"
          breakClassName="text-center"
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
  pageCount: PropTypes.number,
  isLoadingRecipe: PropTypes.bool,
  searchValue: PropTypes.string.isRequired
};

Recipes.defaultProps = {
  recipes: [],
  pageCount: 0,
  isLoadingRecipe: true
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes,
    search: state.recipe.SearchResults,
    pageCount: state.recipe.pageCount,
    isLoadingRecipe: state.recipe.isLoadingRecipe,
    searchValue: state.recipe.searchItem
  };
}


export default connect(mapStateToProps, { apiGetRecipe })(Recipes);
