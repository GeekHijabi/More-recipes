import React from 'react';
import CardItem from '../Partials/CardItem';
import '../../../styles/index.scss';

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class HandPickedRecipe extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
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
        <section id="list" className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
            <h4>
              <span>This Week&rsquo;s Handpicked Recipes</span>
            </h4>
          </div>
          {/* <CardItem /> */}
        </section>
      </div>
    );
  }
}

export default HandPickedRecipe;

