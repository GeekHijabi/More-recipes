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

const image = require('../../../../assets/images/no-avatar.png');

/**
 *
 *
 * @class Profile
 * @extends {React.Component}
 */
export class Profile extends React.Component {
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
  componentDidMount() {
    this.props.apiGetCurrentUser(localStorage.getItem('userId'));
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
   * @description Constructor Function
   * @param {any} props
   * @memberof Profile
   * @return {void}
   */
  render() {
    const {
      currentUser
    } = this.props;
    return (
      <div page="profile">
        <RecipeHeader />
        <main className="row prof-up">
          <div className="dual col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <div className="mt-3">
              <span
                className="float-right span-profile"
                role="button"
                tabIndex="-1"
                onClick={this.toggle}
                data-toggle="tooltip"
                title="Edit profile"
                onKeyPress={this.handleKeyPress}
              >
                <i className="fa fa-edit fa-2x" />
              </span>
              <h1 className="name mb-5">{currentUser.userName}
              </h1>
              <h4>Summary</h4>
              <p className="name-desc">{currentUser.summary}</p>
              <div className="red-border-line mb-4" />
              <h4>About Me</h4>
              <p>{currentUser.bio}</p>
              <EditProfileModal
                user={currentUser}
                isOpen={this.state.modal}
                toggle={this.toggle}
                editProfile={this.props.apiUpdateUserProfile}
              />
            </div>
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
