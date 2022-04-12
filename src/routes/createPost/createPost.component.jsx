import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostForm from "../../components/post-form/post-form.component";

const createPost = () => {
  return (
    <Container>
      <Row>
        <PostForm />
      </Row>
    </Container>
  );
};

export default createPost;
