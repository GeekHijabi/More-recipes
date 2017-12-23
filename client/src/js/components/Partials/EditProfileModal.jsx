import React from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText
} from 'reactstrap';
import imageUpload from '../../utils/imageUpload';


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
    imageUpload(files)
      .then((response) => {
        const { body } = response;
        const fileURL = body.secure_url;
        this.setState({
          imageUrl: fileURL
        });
        console.log('our current image url', this.state.imageUrl);
      });
  }


  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof EditProfileModal
   * @return {void}
   */
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Edit Profile</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={4}>firstName</Label>
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
              <Label for="exampleEmail" sm={4}>lastName</Label>
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
              <Label for="exampleEmail" sm={4}>bio</Label>
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
              <Label for="exampleEmail" sm={4}>summary</Label>
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
              <Label for="exampleFile" sm={4}>File</Label>
              <Col sm={8}>
                <Dropzone onDrop={this.onDrop} />
                <FormText color="muted" />
                {/* {this.state.imageUrl} */}
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={this.onSubmit}>
                   Edit Profile
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditProfileModal;
