// import React from 'react';
// import RecipeHeader from '../../Partials/RecipeHeader';
// import EditProfileModal from '../../Partials/EditProfileModal';

// const image = require('../../../../assets/images/beauty_profile.jpg');
// /**
//  *
//  *
//  * @className MyProfile
//  * @extends {React.Component}
//  */
// class MyProfile extends React.Component {
//   /**
//    * @description COnstructor Function
//    * @param {any} props
//    * @memberof Home
//    * @return {void}
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false
//     };
//   }

//   /**
//    * @description COnstructor Function
//    * @param {any} props
//    * @memberof Home
//    * @return {void}
//    */
//   render() {
//     const {
//       user: {
//         id,
//         firstName,
//         lastName,
//         bio,
//         summary,
//         imageUrl
//       }
//     } = this.props;
//     return (
//       <div>
//         <RecipeHeader />
//         <main className="row prof-up">
//           <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5">
//             <div className="container">
//               {/* <h1 className="name">{firstName}Hamdalah
//                 <br /> {lastName}Adetunji
//               </h1>
//               <p className="name-desc">{summary}</p>
//               <div className="red-border-line" />
//               <h4>Bio</h4>
//               <p>{bio}</p> */}
//               {this.props.user.map(user =>
//                 (<EditProfileModal
//                   user={user}
//                   key={user.id}
//                   editProfile={this.props.apiUpdateUserProfile}
//                 />))}
//               <div className="social-icons">
//                 <a href="/">
//                   <i className="fa fa-twitter-square fa-2x" />
//                 </a>
//                 <a href="/">
//                   <i className="fa fa-instagram fa-2x" />
//                 </a>
//                 <a href="/">
//                   <i className="fa fa-pinterest-square fa-2x" />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
//             <img src={image || this.state.imageUrl} alt="" className="bg" />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }
// }

// export default MyProfile;
