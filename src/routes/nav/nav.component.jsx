import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navigation from "react-bootstrap/Nav";
import { signOutUser } from "../../firebase/firebase";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";

import { UserContext } from "../../context/user.context";
import { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./navigation.styles.scss";
//need to fix this, react doenst like
const Nav = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    const res = await signOutUser();
    console.log(res);
  };

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
              <Button id="Bell-button">
                <BellIcon className="svg-icon" />
              </Button>
              <NavDropdown title={currentUser.displayName}>
                <NavDropdown.Item href="/perfil">
                  Veja seu perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOutHandler}>
                  Sair
                </NavDropdown.Item>
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

<i class="fi-home"></i>;
