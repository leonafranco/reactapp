import Directory from "../../components/directory/directory.component";
import { PostContext } from "../../context/posts.context";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePageLeftMenu from "../../components/home-page-left-menu/home-page-left-menu.component";
import SuggestedFriends from "../../components/suggested-friends/suggsted-friends.component";
import "./home.styles.scss";

const Home = () => {
  const { posts } = useContext(PostContext);
  return (
    <Container>
      <Row>
        <Col>
          <HomePageLeftMenu />
        </Col>
        <Col xs={7}>
          <Directory publication={posts} />
        </Col>
        <Col>
          <SuggestedFriends />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
