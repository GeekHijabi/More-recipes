import React from 'react';
import { Link } from 'react-router-dom';
import EditRecipeModal from '../Partials/EditRecipeModal';

const image = require('../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class AdminCardItem extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof AdminCardItem
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  /**
   * @returns {void}
   *
   * @param {void} empty
   * @memberof AdminCardItem
   */
  onDelete() {
    this.props.deleteRecipe(this.props.recipe.id);
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
   * @description Render Method
   *
   * @memberof AdminCardItem
   * @return {dom} DomElement
   */
  render() {
    const {
      recipe: {
        id,
        recipeName,
        imageUrl
      }
    } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card">
          <img className="card-img-top food-image" src={imageUrl || image} alt="Card cap" style={{ height: '200px' }} />
          <div className="card-body">
            <h4 className="card-title">{recipeName}</h4>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <Link
                  className="btn btn-primary"
                  to={`/recipe/${id}`}
                  href={`/recipe/${id}`}
                >
                  View More
                </Link>
              </div>
              <div className="col-xs-12 col-sm-6">
                <span className="edit">
                  <i
                    role="button"
                    tabIndex="-1"
                    onClick={this.toggle}
                    onKeyPress={this.handleKeyPress}
                    className="fa fa-edit fa-3x"
                  />
                </span>
                <EditRecipeModal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  recipeId={id}
                  editRecipe={this.props.editRecipe}
                />
                <span className="delete">
                  <i
                    className="fa fa-trash fa-4x"
                    role="button"
                    tabIndex="-1"
                    onKeyPress={this.onKeyPress}
                    onClick={() => this.onDelete()}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminCardItem;

{/* <button
  className="btn btn-primary"
  onClick={() => this.props.onViewRecipe(id)}
>
  view more
</button> */}
