import React from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';
import imageUpload from '../../utils/imageUpload';

const profile = require('../../../assets/images/profile.png');


/**
 *
 *
 * @class EditProfileModal
 * @extends {React.Component}
 */
class EditProfileModal extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof EditProfileModal
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      bio: '',
      summary: '',
      imageUrl: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof EditProfileModal
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof EditProfileModal
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.editProfile(this.state)
      .then(() => {
        toastr.options = {
          closeButton: true,
          progressBar: true
        };
        toastr.success('Profile edited Successfully');
        this.props.toggle();
      });
  }

  /**
 * @returns {void}
 *
 * @param {any} files
 * @memberof EditRecipeModal
 */
  onDrop(files) {
    this.setState({
      isLoading: true
    });
    imageUpload(files)
      .then((response) => {
        const { body } = response;
        const fileURL = body.secure_url;
        if (fileURL) {
          this.setState({
            imageUrl: fileURL,
            isLoading: false
          });
        }
      });
  }


  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof EditProfileModal
   * @return {void}
   */
  render() {
    const { imageUrl } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Edit Profile</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={4}>First Name</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="firstName"
                  id="exampleEmail"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  placeholder="input first name"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Last Name</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="lastName"
                  id="exampleEmail"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  placeholder="input last name"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Bio</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="bio"
                  id="exampleEmail"
                  value={this.state.bio}
                  onChange={this.onChange}
                  placeholder="Input a bio describing you"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Summary</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="summary"
                  id="exampleEmail"
                  value={this.state.summary}
                  onChange={this.onChange}
                  placeholder="Input a cute summary of yourself"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleFile" lg={4}>Image</Label>
              <Col sm={8}>
                <input
                  type="file"
                  name="image"
                  onChange={this.onDrop}
                  accept="image/*"
                />
                { this.state.isLoading ?
                  <RingLoader
                    color="#B0C038"
                    loading={this.props.isLoadingRecipe}
                  />
                : <img
                  src={imageUrl || profile}
                  alt="sample"
                  className="styledImage"
                />}
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                {this.state.isLoading ? 'please wait a few seconds...' :
                <Button onClick={this.onSubmit}>
                   Edit
                </Button>
            }
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

EditProfileModal.defaultProps = {
  isLoadingRecipe: true
};

EditProfileModal.propTypes = {
  editProfile: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoadingRecipe: PropTypes.bool


};


export default EditProfileModal;
