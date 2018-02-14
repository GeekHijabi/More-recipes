import React from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';
import imageUpload from '../../utils/imageUpload';
import validateRecipeInput from '../../utils/validations/recipeFormValidation';

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
   * @return {object} recipe sate
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      ingredients: '',
      description: '',
      imageUrl: '',
      errors: {},
      errorMessage: '',
      isLoading: false,
      hasError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
 * @param {any} event
 * @memberof AddRecipeModal
 * @returns {void}
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 *
 * @param {any} event
 * @memberof AddRecipeModal
 * @returns {void}
 */
  onSubmit(event) {
    if (this.isValid()) {
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
        this.setState({
          errorMessage: err.response.data.error,
          hasError: true,
          errors: {}
        });
      });
    }
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
  *
  * @param {any} event
  * @memberof AddRecipeModal
  * @returns {object} event
  */
  isValid() {
    const { errors, isValid } = validateRecipeInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  /**
   * @description constructor Function
   * @param {any} props
   * @memberof AddRecipeModal
   * @return {void}
   */
  render() {
    const { imageUrl, errors } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add recipe</ModalHeader>
        <ModalBody>
          { this.state.hasError && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {this.state.errorMessage}
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
              <Label for="exampleEmail" sm={4}>Recipe Name
              <span style={{ color: 'red' }} > *</span>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="recipeName"
                  id="exampleEmail"
                  value={this.state.recipeName}
                  onChange={this.onChange}
                  placeholder="input Recipe name"
                />
                {errors.recipeName &&
                <small style={{ color: '#A43741' }}>
                  {errors.recipeName }
                </small>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Ingredients
              <span style={{ color: 'red' }} > *</span>
              </Label>
              <Col sm={8}>
                <textarea
                  type="text"
                  name="ingredients"
                  id="exampleEmail"
                  className="styledTextarea"
                  value={this.state.ingredients}
                  onChange={this.onChange}
                  placeholder="e.g 2 cups of beans, 1 onion-chopped"
                />
                {errors.ingredients &&
                <small style={{ color: '#A43741' }}>
                  {errors.ingredients }
                </small>}
              </Col>
              <span style={{ color: 'red', marginLeft: '13.5em' }}>
              separate ingredients with commas
              </span>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Description
              <span style={{ color: 'red' }} > *</span>
              </Label>
              <Col sm={8}>
                <textarea
                  type="text"
                  name="description"
                  id="exampleEmail"
                  className="styledTextarea"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="e.g Sieve the beans, and blend to taste"
                />
                {errors.description &&
                <small style={{ color: '#A43741' }}>
                  {errors.description }
                </small>}
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

            <FormGroup check row className="modal-button">
              <Col sm={{ size: 10, offset: 5 }}>
                {this.state.isLoading ? 'Please wait a few seconds...' :
                <Button onClick={this.onSubmit} className="submit-btn">
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
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoadingRecipe: PropTypes.bool


};


export default AddRecipeModal;
