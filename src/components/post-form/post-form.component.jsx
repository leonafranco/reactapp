import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { addCollectionAndDocuments } from "../../firebase/firebase";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  text: "",
  displayName: "",
  uuid: "",
  currentTime: "",
  likes: 0,
};

const PostForm = () => {
  const { currentUser } = useContext(UserContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { text } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formFields.displayName = currentUser.displayName;
      formFields.currentTime = Date.now();
      formFields.uuid = currentUser.reloadUserInfo.localId;
      formFields.likes = 0;
      console.log(formFields);
      await addCollectionAndDocuments("POST", formFields);
      resetFormFields();
    } catch (error) {}
  };

  return (
    <Container>
      <Row>
        <Col xs={2}></Col>
        <Col xs={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Make a New Post</Form.Label>
              <Form.Control
                required
                onChange={handleChange}
                value={text}
                name="text"
                as="textarea"
                rows={5}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostForm;
