import Directory from "../../components/directory/directory.component";
import { PostContext } from "../../context/posts.context";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./home.styles.scss";

const Home = () => {
  const { posts } = useContext(PostContext);
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Button>Home</Button>
          </Row>
          <Row>
            <Button>Amigos</Button>
          </Row>
          <Row>
            <Button>Ofertas</Button>
          </Row>
          <Row>
            <Button>Contact</Button>
          </Row>
        </Col>
        <Col xs={7}>
          <Directory publication={posts} />
        </Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
  );
};

export default Home;
