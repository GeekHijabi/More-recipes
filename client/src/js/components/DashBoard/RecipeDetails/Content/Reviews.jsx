// import React from 'react';
// import PropTypes from 'prop-types';
// import AddReviewForm from '../../../Partials/AddReviewForm';
// import { apiGetSingleReview } from '../../../../actions/recipe';


// const Reviews = props => (
//   <div
//     className={props.activeTab.name === 'Reviews' ?
//     'tab-pane fade show active' :
//     'tab-pane fade'}
//     id="reviews"
//     role="tabpanel"
//     aria-labelledby="reviews-tab"
//   >
//     <AddReviewForm
//       recipeId={props.recipeId}
//     />
//     <ul className={props.activeTab.name === 'Reviews' ?
//     'tab-pane fade show active' :
//     'tab-pane fade'}
//     >
//       {props.activeTab.name === 'Reviews' ?
//       props.reviewedRecipe.Reviews.map(review =>
//         (<li className="list-group-item">{review.reviews}</li>))
//       : 'no reviews'}

//     </ul>
//   </div>
// );


// Reviews.propTypes = {
//   activeTab: PropTypes.func.isRequired,
//   recipeId: PropTypes.objectOf(String).isRequired,
//   reviewedRecipe: PropTypes.objectOf(String).isRequired,
// };


// // /**
// // //  *
// // //  *
// // //  * @className Reviews
// // //  * @extends {React.Component}
// // //  */
// // class Reviews extends React.Component {
// //   /**
// //    * @description COnstructor Function
// //    * @param {any} props
// //    * @memberof Home
// //    * @return {void}
// //    */
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       modal: false
// //     };
// //   }

// //   /**
// //    * @description COnstructor Function
// //    * @param {any} props
// //    * @memberof Home
// //    * @return {void}
// //    */
// //   render() {
// //     const { recipe } = this.props;
// //     return (
// //       <div
// //         className={props.activeTab.name === 'Reviews' ?
// //     'tab-pane fade show active' :
// //     'tab-pane fade'}
// //         id="reviews"
// //         role="tabpanel"
// //         aria-labelledby="reviews-tab"
// //       >
// //         <AddReviewForm
// //           recipeId={props.recipeId}
// //         />
// //         <ul className={props.activeTab.name === 'Reviews' ?
// //     'tab-pane fade show active' :
// //     'tab-pane fade'}
// //         >
// //           {props.activeTab.name === 'Reviews' ?
// //       props.reviewedRecipe.Reviews.map(review =>
// //         (<li className="list-group-item">{review.reviews}</li>))
// //       : 'no reviews'}

// //         </ul>
// //       </div>
// //     );
// //   }
// // }

// export default Reviews;

import React from 'react';
import PropTypes from 'prop-types';
import AddReviewForm from '../../../Partials/AddReviewForm';
// import { apiGetSingleReview } from '../../../../actions/recipe';


const Reviews = props => (
  <div
    className={props.activeTab.name === 'Reviews' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
    id="reviews"
    role="tabpanel"
    aria-labelledby="reviews-tab"
  >
    <AddReviewForm
      recipeId={props.recipeId}
    />
    <ul className={props.activeTab.name === 'Reviews' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
    >
      {props.activeTab.name === 'Reviews' ?
      props.reviewedRecipe.Reviews.map(review =>
        (<li key={review.id} className="list-group-item">
          <h6>{review.User.userName} {review.createdAt}</h6>
          {review.reviews}
         </li>))
      : 'no reviews'}

    </ul>
  </div>
);


Reviews.propTypes = {
  activeTab: PropTypes.func.isRequired,
  recipeId: PropTypes.objectOf(String).isRequired,
  reviewedRecipe: PropTypes.objectOf(String).isRequired,
};

export default Reviews;
