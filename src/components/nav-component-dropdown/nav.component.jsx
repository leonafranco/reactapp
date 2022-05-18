import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navigation from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";
import { getDocActualUser } from "../../firebase/firebase";
import { signOutUser } from "../../firebase/firebase";

const NavDropdownComponent = (uid) => {
  const [username, setUsername] = useState({});
  const [isLoading, setLoading] = useState(false);

  const actualUser = async () => {
    await getDocActualUser(uid.uid).then((resp) => {
      setUsername(resp.displayName);
      setLoading(true);
    });
  };

  useEffect(() => {
    actualUser();
  });

  const signOutHandler = async () => {
    await signOutUser();
  };

  return isLoading ? (
    <Navigation>
      <Link to="/new">
        <Button id="Button-Nav">Create Post</Button>
      </Link>
      <Button id="Bell-button">
        <BellIcon className="svg-icon" />
      </Button>
      <NavDropdown title={username}>
        <NavDropdown.Item href="/perfil">Veja seu perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={signOutHandler}>Sair</NavDropdown.Item>
      </NavDropdown>
    </Navigation>
  ) : (
    ""
  );
};

export default NavDropdownComponent;
