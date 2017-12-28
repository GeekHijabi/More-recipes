import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import Tabs from './Tabs';
import Content from './Content';
import { onViewRecipe,
  apiUpVoteRecipe,
  apiDownVoteRecipe,
  apifavoriteRecipe,
  apiGetRecipeReview } from '../../../actions/recipe';

const Image = require('../../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class MyProfile
 * @extends {React.Component}
 */
class MyRecipe extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      activeTab: {
        name: 'Ingredients',
        isActive: true
      }
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleUpVote = this.handleupvote.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof RecipeAdmin
 */
  componentWillMount() {
    const recipeId = this.props.match.params.id;
    this.props.onViewRecipe(recipeId);
  }

  /**
   *
   * @param {object} tab
   *
   * @returns {void}
   */
  handleChangeTab(tab) {
    this.setState({
      activeTab: tab
    });
  }

  /**
   *
   * @param {object} id
   *
   * @returns {void}
   */
  handleupvote() {
    this.props.apiUpVoteRecipe(this.props.recipe.id)
      .then(() => {
        this.props.onViewRecipe(this.props.recipe.id);
      });
  }
  /**
   *
   * @param {object} id
   *
   * @returns {void}
   */
  handledownvote() {
    this.props.apiDownVoteRecipe(this.props.recipe.id)
      .then(() => {
        this.props.onViewRecipe(this.props.recipe.id);
      });
  }
  /**
   *
   * @param {object} id
   *
   * @returns {void}
   */
  handlefavorite() {
    this.props.apifavoriteRecipe(this.props.recipe.id);
  }
  /**
   * @description constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipe } = this.props;
    return (
      <div>
        <RecipeHeader />
        <main page="details" className="row">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img src={recipe.imageUrl || Image} alt={recipe.recipeName} className="food" />
            <h4>
              <span className="food_name">{recipe.recipeName}</span>
            </h4>
            <div className="food_vote">
              <span className="vote_type">
                <i
                  className="fa fa-thumbs-o-up fa-2x"
                  role="button"
                  tabIndex="-1"
                  onKeyPress={this.handleKeyPress}
                  // handleupvote={this.handleupvote}
                  onClick={() => this.handleupvote()}
                />
                <span className="detail-value">{recipe.upvotes}</span>
                <span>upvote</span>
              </span>
              <span className="vote_type">
                <i
                  className="fa fa-thumbs-o-down fa-2x"
                  role="button"
                  tabIndex="-1"
                  onKeyPress={this.handleKeyPress}
                  // handledownvote={this.handledownvote}
                  onClick={() => this.handledownvote()}
                />
                <span className="detail-value">{recipe.downvotes}</span>
                <span>downvotes</span>
              </span>
              <span className="vote_type">
                <i
                  className="fa fa-heart-o fa-2x"
                  role="button"
                  tabIndex="-1"
                  onKeyPress={this.handleKeyPress}
                  onClick={() => this.handlefavorite()}
                />
                <span className="detail-value">{recipe.views}</span>
                <span>favorites</span>
              </span>
            </div>
          </div>
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <Tabs
              activeTab={this.state.activeTab}
              changeTab={this.handleChangeTab}
            />
            <Content
              recipe={this.props.recipe}
              reviewedRecipe={recipe}
              activeTab={this.state.activeTab}
              recipeId={recipe.id} //
            />

          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

MyRecipe.propTypes = {
  onViewRecipe: PropTypes.func.isRequired,
  apiUpVoteRecipe: PropTypes.func.isRequired,
  apiDownVoteRecipe: PropTypes.func.isRequired,
  apifavoriteRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.func.isRequired,
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    recipe: state.recipe.recipe,
  };
}

export default connect(
  mapStateToProps,
  {
    onViewRecipe,
    apiUpVoteRecipe,
    apiDownVoteRecipe,
    apifavoriteRecipe,
    apiGetRecipeReview
  }
)(MyRecipe);
