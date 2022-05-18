import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CommentCard from "../../components/comment-card/comment-card.component";

const comment = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <CommentCard />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default comment;
