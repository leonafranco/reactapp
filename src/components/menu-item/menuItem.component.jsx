import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { getDocActualUser } from "../../firebase/firebase";
import {
  updateLikes,
  checkIfUsersAlreadyLikedIt,
} from "../../firebase/firebase";

import "./menuItem.styles.scss";

const MenuItem = ({ displayName, text, currentTime, docId, likes, uuid }) => {
  const [username, setUsername] = useState();
  const [isLoading, setLoading] = useState(false);

  const actualUser = async () => {
    await getDocActualUser(uuid).then((resp) => {
      setUsername(resp);
      setLoading(true);
    });
  };

  useEffect(() => {
    actualUser();
  }, []);

  const handleLikeButton = async () => {
    let isAlreadyLikedIt = await checkIfUsersAlreadyLikedIt(uuid, docId);
    await updateLikes(docId, isAlreadyLikedIt, uuid);
    isAlreadyLikedIt
      ? setLikesValue(likesValue - 1)
      : setLikesValue(likesValue + 1);
  };

  const [likesValue, setLikesValue] = useState(likes);

  let d = new Date(currentTime);
  return isLoading ? (
    <Card id="Menu-item-card">
      <Card.Body>
        <Card.Title>
          <img
            id="Style-img"
            src={username.profilePic}
            width="50"
            height="50"
            alt="avatar"
          />
          {username.displayName}{" "}
          <h6>{d.toString().split(/\s+/).slice(0, 4).join(" ")}</h6>
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button onClick={handleLikeButton} id="Button-card">
          {likesValue} Likes
        </Button>
        <Link state={username} to={docId}>
          <Button id="Button-card">Comments</Button>
        </Link>
      </Card.Body>
    </Card>
  ) : (
    ""
  );
};

export default MenuItem;
