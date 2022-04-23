import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContactCard from "../../components/contact-card/contact-card.component";

const contact = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <ContactCard />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default contact;
