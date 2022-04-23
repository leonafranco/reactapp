import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./menuItem.styles.scss";

const MenuItem = ({ displayName, text, currentTime }) => {
  return (
    <Card id="Menu-item-card">
      <Card.Body>
        <Card.Title>
          {displayName} <h6>{currentTime.split(" ").slice(0, 3)}</h6>
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button id="Button-card">41 Likes</Button>
        <Button id="Button-card">52 Comments</Button>
      </Card.Body>
    </Card>
  );
};

export default MenuItem;
