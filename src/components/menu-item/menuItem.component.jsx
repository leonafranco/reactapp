import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./menuItem.styles.scss";

const MenuItem = ({ displayName, text }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{displayName}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button>Likes</Button>
        <Button>Comments</Button>
      </Card.Body>
    </Card>
  );
};

export default MenuItem;
