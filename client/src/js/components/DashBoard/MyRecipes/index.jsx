import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { RingLoader } from 'react-spinners';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import AdminCardItem from '../../Partials/AdminCardItem';
import AddRecipeModal from '../../Partials/AddRecipeModal';
import { apiCreateRecipe,
  apiGetMyRecipe,
  apiEditRecipe,
  apiDeleteRecipe,
  onViewRecipe
} from '../../../actions/recipe';

/**
 *
 *
 * @class RecipeAdmin
 * @extends {React.Component}
 */
class RecipeAdmin extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof RecipeAdmin
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      page: 1
    };
    this.toggle = this.toggle.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.viewRecipe = this.viewRecipe.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof RecipeAdmin
 */
  componentWillMount() {
    this.props.apiGetMyRecipe();
  }


  /**
   * @description COnstructor Function
   * @param {any} nextProps
   * @memberof Recipes
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.pageCount,
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
    this.props.apiGetMyRecipe(current.selected);
  }


  /**
   * @returns {void}
   *
   * @param {integer} id
   * @memberof RecipeAdmin
   */
  onDelete(id) {
    this.props.apiDeleteRecipe(id);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof RecipeAdmin
 */
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} recipeId
   * @memberof RecipeAdmin
   */
  viewRecipe(recipeId) {
    this.props.onViewRecipe(recipeId);
    this.context.router.history.push(`/recipe/${recipeId}`);
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
        <RecipeHeader />
        <div style={{ width: '85%', margin: '0 auto', minHeight: '700px' }}>
          <section id="list" className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
              <h4>
                <span>My Recipe</span>
              </h4>
              <i
                role="button"
                tabIndex="-1"
                onClick={this.toggle}
                data-toggle="tooltip"
                title="Add recipe"
                onKeyPress={this.handleKeyPress}
                className="fa fa-plus-circle fa-2x fa-icons"
              />
            </div>
            <AddRecipeModal
              isOpen={this.state.modal}
              errorMessage={this.props.errorMessage}
              toggle={this.toggle}
              createRecipe={this.props.apiCreateRecipe}
            />
            <div className="container-fluid">
              <div className="row">
                {this.props.isLoadingRecipe ? <RingLoader
                  color="#B0C038"
                  loading={this.props.isLoadingRecipe}
                />
              : this.props.myRecipes.map(recipe =>
              (<AdminCardItem
                recipe={recipe}
                key={recipe.id}
                editRecipe={this.props.apiEditRecipe}
                deleteRecipe={this.onDelete}
                onViewRecipe={this.viewRecipe}
              />))
              }
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {this.props.myRecipes.length === 0
              && (
              <span className="styleText">
              You have not created any recipe yet!, click
              the button to add a new recipe
              </span>)}
                </div>
              </div>
            </div>
          </section>
        </div>
        {this.props.myRecipes.length > 0 ?
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
          /> : ''}
        <Footer />
      </div>
    );
  }
}

RecipeAdmin.defaultProps = {
  pageCount: 0,
  isLoadingRecipe: false
};


RecipeAdmin.propTypes = {
  apiCreateRecipe: PropTypes.func.isRequired,
  apiGetMyRecipe: PropTypes.func.isRequired,
  apiDeleteRecipe: PropTypes.func.isRequired,
  apiEditRecipe: PropTypes.func.isRequired,
  onViewRecipe: PropTypes.func.isRequired,
  myRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  errorMessage: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  isLoadingRecipe: PropTypes.bool
};

RecipeAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    myRecipes: state.recipe.myRecipes,
    recipe: state.recipe.recipe,
    errorMessage: state.recipe.errorMessage,
    pageCount: state.recipe.pageCount
  };
}

export default connect(
  mapStateToProps,
  {
    apiCreateRecipe,
    apiGetMyRecipe,
    apiDeleteRecipe,
    apiEditRecipe,
    onViewRecipe
  }
)(RecipeAdmin);
