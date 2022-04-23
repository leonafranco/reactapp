import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navigation from "react-bootstrap/Nav";

import { UserContext } from "../../context/user.context";
import { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./navigation.styles.scss";
//need to fix this, react doenst like
const Nav = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? (
    <Fragment>
      <Navbar id="Navbar">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/home">
              Portal Estgoh
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navigation>
              <Link to="/new">
                <Button id="Button-Nav">Create Post</Button>
              </Link>
              <Button id="Button-Nav">bell</Button>
              <NavDropdown title={currentUser.displayName}>
                <NavDropdown.Item>Veja seu perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Criar um post</NavDropdown.Item>
                <NavDropdown.Item>Sair</NavDropdown.Item>
              </NavDropdown>
            </Navigation>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  ) : (
    ""
  );
};

export default Nav;
