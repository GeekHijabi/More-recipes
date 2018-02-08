import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import Tabs from './Tabs';
import Content from './Content';
import {
  onViewRecipe,
  apiUpVoteRecipe,
  apiDownVoteRecipe,
  apifavoriteRecipe,
  apiRecipeViewCount
} from '../../../actions/recipe';

const Image = require('../../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class MyRecipe
 * @extends {React.Component}
 */
class MyRecipe extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof MyRecipe
   * @return {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      activeTab: {
        name: 'Descriptions',
        isActive: true,
        upvotes: false,
        downvotes: false
      }
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleUpVote = this.handleupvote.bind(this);
  }

  /**
 * @description componentDidMount
 * @param {any} void
 * @memberof RecipeAdmin
 * @returns {void}
 */
  componentDidMount() {
    const recipeId = this.props.match.params.id;
    this.props.onViewRecipe(recipeId).catch((err) => {
      if (err.response.status === 404) {
        this.props.history.push('/*');
      }
    });
    this.props.apiRecipeViewCount(recipeId);
  }

  /**
   *
   * @param {object} tab
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
    this.props.apifavoriteRecipe(this.props.recipe.id)
      .then(() => {
        this.props.onViewRecipe(this.props.recipe.id);
      });
  }

  /**
   * @description constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const {
      recipe, views,
    } = this.props;
    return (
      <div>
        <RecipeHeader />
        <main page="details" className="row">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img
              src={recipe.imageUrl || Image}
              alt={recipe.recipeName}
              className="food"
            />
            <h4>
              <span className="food_name">{recipe.recipeName}</span>
            </h4>
            <div className="food_vote">
              <span className="vote_type">
                <i
                  className="fa fa-thumbs-o-up fa-2x"
                  role="button"
                  data-toggle="tool-tip"
                  title="upvote recipe"
                  tabIndex="-1"
                  onKeyPress={this.handleKeyPress}
                  onClick={() => this.handleupvote()}
                />
                {recipe.upvotes > 1 ? <span>upvotes</span> :
                <span>upvote</span>
                }
                <span className="detail-value">{recipe.upvotes}</span>
              </span>
              <span className="vote_type">
                <i
                  className="fa fa-thumbs-o-down fa-2x"
                  role="button"
                  data-toggle="tool-tip"
                  title="downvote recipe"
                  tabIndex="-1"
                  onKeyPress={this.handleKeyPress}
                  onClick={() => this.handledownvote()}
                />
                {recipe.downvotes > 1 ? <span>downvotes</span> :
                <span>downvote</span>
                }
                <span className="detail-value">{recipe.downvotes}</span>
              </span>
              <span className="vote_type">
                <i
                  className="fa fa-heart fa-2x"
                  data-toggle="tool-tip"
                  title="add to favorites"
                  role="button"
                  tabIndex="-1"
                  onKeyPress={this.handleKeyPress}
                  onClick={() => this.handlefavorite()}
                />
                {recipe.favoriteCount > 1 ? <span>favorites</span> :
                <span>favorite</span>
                }
                <span className="detail-value">{recipe.favoriteCount}</span>
              </span>
              <span className="vote_type">
                <i
                  className="fa fa-eye fa-2x"
                  data-toggle="tool-tip"
                  title="number of views"
                />
                {views > 1 ? <span>views</span> :
                <span>view</span>
                }
                <span className="detail-value">{views}</span>
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
              recipeId={recipe.id}
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
  apiRecipeViewCount: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  views: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
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
    views: state.recipe.views
  };
}

export default connect(
  mapStateToProps,
  {
    onViewRecipe,
    apiUpVoteRecipe,
    apiDownVoteRecipe,
    apifavoriteRecipe,
    apiRecipeViewCount
  }
)(MyRecipe);
