import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

import "./navigation.styles.scss";

const Nav = () => {
  return (
    <Fragment>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/home">
              Portal Estgoh
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button>Create Post</Button>
              <Button>Vai ter uma bell</Button>
              <Button>Foto</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

/*       <div className="nav">
        <div>sadasda</div>
        <div class="nav-link-container">

        </div>
      </div> */

export default Nav;
