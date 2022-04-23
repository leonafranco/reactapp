import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./home-page-left-menu.component.styles.scss";

const HomePageLeftMenu = () => {
  return (
    <Container>
      <Link to="/home">
        <Row>
          <Button id="Button">Home</Button>
        </Row>
      </Link>
      <Row>
        <Button id="Button">Amigos</Button>
      </Row>
      <Row>
        <Button id="Button">Ofertas</Button>
      </Row>
      <Link to="/contact">
        <Row>
          <Button id="Button">Contacto</Button>
        </Row>
      </Link>
    </Container>
  );
};

export default HomePageLeftMenu;
