import React from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col
} from 'reactstrap';
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
      id,
      recipeName,
      ingredients,
      description,
      imageUrl
    } = this.props.recipe;
    this.state = {
      recipeName,
      ingredients,
      description,
      imageUrl
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
    imageUpload(files)
      .then((response) => {
        const { body } = response;
        const fileURL = body.secure_url;
        this.setState({
          imageUrl: fileURL
        });
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
                  placeholder="input Recipe name"
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
                  value={this.state.ingredients}
                  onChange={this.onChange}
                  placeholder="input your recipe ingredients"
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
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Input a description for your recipe"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleFile" lg={4}>File</Label>
              {/* <div> */}
              <Col sm={8}>
                <input
                  type="file"
                  name="image"
                  onChange={this.onDrop}
                  accept="image/*"
                />
                <img
                  src={imageUrl}
                  alt="sample"
                  height="400"
                  width="100%"
                />
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 5 }}>
                <Button onClick={this.onSubmit}>
                   Edit recipe
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditRecipeModal;
