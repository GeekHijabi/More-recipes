import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import EditProfileModal from '../../Partials/EditProfileModal';
import {
  apiUpdateUserProfile,
  apiGetCurrentUser
} from '../../../actions/auth';

const image = require('../../../../assets/images/beauty_profile.jpg');

/**
 *
 *
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Profile
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {any} void
   * @memberof RecipeAdmin
   */
  componentWillMount() {
    this.props.apiGetCurrentUser();
  }


  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof Profile
 */
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Profile
   * @return {void}
   */
  render() {
    const {
      currentUser
    } = this.props;
    console.log('cur', this.props.currentUser);
    return (
      <div page="profile">
        <RecipeHeader />
        <main className="row prof-up">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <div className="container">
              <h1 className="name">{currentUser.firstName}
                <br /> {currentUser.lastName}
              </h1>
              <i
                role="button"
                tabIndex="-1"
                onClick={this.toggle}
                onKeyPress={this.handleKeyPress}
                className="fa fa-edit fa-2x"
              />
              <p className="name-desc">{currentUser.summary}</p>
              <div className="red-border-line" />
              <h4>Bio</h4>
              <p>{currentUser.bio}</p>
              <EditProfileModal
                user={currentUser}
                isOpen={this.state.modal}
                toggle={this.toggle}
                editProfile={this.props.apiUpdateUserProfile}
              />
              <div className="social-icons">
                <a href="/">
                  <i className="fa fa-twitter-square fa-2x" />
                </a>
                <a href="/">
                  <i className="fa fa-instagram fa-2x" />
                </a>
                <a href="/">
                  <i className="fa fa-pinterest-square fa-2x" />
                </a>
              </div>
            </div>
          </div>
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-7">
            <img src={currentUser.imageUrl || image} alt="" className="bg" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser
  };
}


Profile.propTypes = {
  apiUpdateUserProfile: PropTypes.func.isRequired,
  apiGetCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired
};


export default connect(
  mapStateToProps,
  { apiUpdateUserProfile, apiGetCurrentUser }
)(Profile);
