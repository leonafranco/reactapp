import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomePageLeftMenu from "../../components/home-page-left-menu/home-page-left-menu.component";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { addCollectionAndDocuments } from "../../firebase/firebase";
import { UserContext } from "../../context/user.context";
import Button from "react-bootstrap/Button";

const Perfil = () => {
  const { currentUser } = useContext(UserContext);

  const defaultFormFields = {
    displayName: currentUser.displayName,
    email: currentUser.email,
    curso: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, curso } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCollectionAndDocuments(
        "personalInformation",
        formFields,
        currentUser.uid
      );
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Container id="Container">
      <Row>
        <Col xs={3}>
          <HomePageLeftMenu />
        </Col>
        <Col xs={7}>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Card.Body>
                <Card.Title>User</Card.Title>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={currentUser.email}
                    onChange={handleChange}
                    name="email"
                    value={email}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Profile image</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Card.Body>

              <Card.Body>
                <Card.Title>ESTGOH Info</Card.Title>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Curso</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="curso"
                    value={curso}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Select aria-label="Profissão">
                    <option>Profissão</option>
                    <option value="1">Estudante</option>
                    <option value="2">Formado</option>
                    <option value="3">Professor</option>
                  </Form.Select>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" type="submit">
                    Save Personal Information
                  </Button>
                </div>
              </Card.Body>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
