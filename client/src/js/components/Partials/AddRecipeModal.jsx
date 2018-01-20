import React from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';
import imageUpload from '../../utils/imageUpload';

const image = require('../../../assets/images/default_image.jpeg');

/**
 *
 *
 * @class AddRecipeModal
 * @extends {React.Component}
 */
class AddRecipeModal extends React.Component {
  /**
   * @description constructor
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      ingredients: '',
      description: '',
      imageUrl: '',
      isLoading: false,
      hasError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof AddRecipeModal
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof AddRecipeModal
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.createRecipe(this.state).then((res) => {
      this.setState({
        recipeName: '',
        ingredients: '',
        description: '',
        imageUrl: ''
      });
      if (res && res.data) {
        this.setState({
          hasError: false
        });
        toastr.options = {
          closeButton: true,
          progressBar: true
        };
        toastr.success('Recipe Created Successfully');
        this.props.toggle();
      }
    }).catch((err) => {
      if (err) {
        this.setState({
          hasError: true
        });
      }
    });
  }

  /**
 * @returns {void}
 *
 * @param {any} files
 * @memberof AddRecipeModal
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
   * @description constructor Function
   * @param {any} props
   * @memberof AddRecipeModal
   * @return {void}
   */
  render() {
    const { imageUrl } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add recipe</ModalHeader>
        <ModalBody>
          { this.state.hasError && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {this.props.errorMessage}
            <button
              type="button"
              className="close"
              onClick={this.onDismiss}
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
              )}
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Name</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="recipeName"
                  id="exampleEmail"
                  value={this.state.recipeName}
                  onChange={this.onChange}
                  placeholder="input Recipe name"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Ingredients</Label>
              <Col sm={8}>
                <textarea
                  type="text"
                  name="ingredients"
                  id="exampleEmail"
                  className="styledTextarea"
                  value={this.state.ingredients}
                  onChange={this.onChange}
                  placeholder="input your recipe ingredients"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Description</Label>
              <Col sm={8}>
                <textarea
                  type="text"
                  name="description"
                  id="exampleEmail"
                  className="styledTextarea"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Input a description for your recipe"
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
                  src={imageUrl || image}
                  alt="sample"
                  className="styledImage"
                />}
              </Col>
            </FormGroup>

            <FormGroup check row className="styleButton">
              <Col sm={{ size: 10, offset: 5 }}>
                {this.state.isLoading ? 'please wait a few seconds...' :
                <Button onClick={this.onSubmit}>
                 Submit
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

AddRecipeModal.defaultProps = {
  isLoadingRecipe: true
};

AddRecipeModal.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoadingRecipe: PropTypes.bool


};


export default AddRecipeModal;
