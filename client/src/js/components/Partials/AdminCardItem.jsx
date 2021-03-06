import React from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import swal from 'sweetalert';
import EditRecipeModal from '../Partials/EditRecipeModal';

const defaultImage = require('../../../assets/images/no_image.png');

/**
 *
 *
 * @class AdminCardItem
 * @extends {React.Component}
 */
export class AdminCardItem extends React.Component {
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
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this recipe!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteRecipe(this.props.recipe.id);
          swal('Poof! Your recipe has been deleted!', {
            icon: 'success',
          });
        }
      });
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof AdminCardItem
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
      <div id={`recipe-${id}`} className="col-xs-12 col-sm-6 col-md-3 col-lg-4 mb-3">
        <div className="card card-size">
          <img
            className="card-img-top card-height"
            src={imageUrl || defaultImage}
            alt="Card cap"
          />
          <div className="card-body">
            <h4 className="card-title">{recipeName}</h4>
            <div className="row row-card">
              <div className="col-xs-12 col-sm-6 card-padding">
                <Link
                  className="btn card-view"
                  to={`/recipe/${id}`}
                  href={`/recipe/${id}`}
                >
                  View More
                </Link>
              </div>
              <div className="col-xs-12 col-sm-6 card-paddings">
                <span className="edit padding">
                  <i
                    role="button"
                    tabIndex="-1"
                    onClick={this.toggle}
                    data-toggle="tooltip"
                    title="Edit recipe"
                    onKeyPress={this.handleKeyPress}
                    className="fa fa-edit fa-2x fa-icons"
                  />
                </span>
                <EditRecipeModal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  recipe={this.props.recipe}
                  editRecipe={this.props.editRecipe}
                />
                <span className="delete paddings">
                  <i
                    className="fa fa-trash fa-2x fa-icons"
                    role="button"
                    tabIndex="-1"
                    data-toggle="tooltip"
                    title="Delete profile"
                    onKeyPress={this.onKeyPress}
                    onClick={this.onDelete}
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
AdminCardItem.propTypes = {
  deleteRecipe: Proptypes.func.isRequired,
  editRecipe: Proptypes.func.isRequired,
  recipe: Proptypes.objectOf(Proptypes.any).isRequired
};

export default AdminCardItem;
