import React from 'react';

const image = require('../../../assets/images/banner_bg.jpg');

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class AdminCardItem extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof AdminCardItem
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.onDelete = this.onDelete.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof CardItem
 */
  onDelete(event) {
    // this.props.deleteRecipe(this.props.recipe.id);
    console.log('we are deleting******');
  }

  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const {
      recipe: {
        recipeName,
        imageUrl,
        upvotes,
        downvotes
      }
    } = this.props;
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card">
            <img className="card-img-top food-image" src={imageUrl || image} alt="Card cap" />
            <div className="card-body">
              <h4 className="card-title">{recipeName}</h4>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <a href="" className="btn btn-primary">view more</a>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <span className="ratings">
                    <i className="fa fa-thumbs-o-up" />
                    <span>{upvotes || 0}</span>
                  </span>
                  <span className="ratings">
                    <i className="fa fa-thumbs-o-down" />
                    <span>{downvotes || 0}</span>
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

