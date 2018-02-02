import React from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';
import imageUpload from '../../utils/imageUpload';

/**
 *
 *
 * @class EditRecipeModal
 * @extends {React.Component}
 */
class EditRecipeModal extends React.Component {
  /**
   * @description constructor Function
   * @param {any} props
   * @memberof EditRecipeModal
   * @return {void}
   */
  constructor(props) {
    super(props);
    const {
      recipeName,
      ingredients,
      description,
      imageUrl
    } = this.props.recipe;
    this.state = {
      recipeName,
      ingredients,
      description,
      imageUrl,
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof EditRecipeModal
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof EditRecipeModal
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.editRecipe(this.props.recipe.id, this.state).then(() => {
      toastr.options = {
        closeButton: true,
        progressBar: true
      };
      toastr.success('Recipe edited Successfully');
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
      }).catch(() => {
        'unsuccessful upload';
      });
  }

  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof EditRecipeModal
   * @return {void}
   */
  render() {
    const { imageUrl } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Edit recipe</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>Recipe Name</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="recipeName"
                  id="exampleEmail"
                  value={this.state.recipeName}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>Ingredients</Label>
              <Col sm={8}>
                <textarea
                  type="text"
                  name="ingredients"
                  id="exampleEmail"
                  className="styledTextarea"
                  value={this.state.ingredients}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>Description</Label>
              <Col sm={8}>
                <textarea
                  type="text"
                  name="description"
                  id="exampleEmail"
                  className="styledTextarea"
                  value={this.state.description}
                  onChange={this.onChange}
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
                  /> :
                  <img
                    src={imageUrl}
                    alt="sample"
                    className="styledImage"
                  />}
              </Col>
            </FormGroup>

            <FormGroup check row className="modal-button">
              <Col sm={{ size: 10, offset: 5 }}>
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

EditRecipeModal.defaultProps = {
  isLoadingRecipe: true
};

EditRecipeModal.propTypes = {
  editRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoadingRecipe: PropTypes.bool


};
export default EditRecipeModal;
