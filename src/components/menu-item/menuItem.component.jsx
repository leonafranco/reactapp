import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import {
  updateLikes,
  checkIfUsersAlreadyLikedIt,
} from "../../firebase/firebase";

import "./menuItem.styles.scss";

import { UserContext } from "../../context/user.context";

const MenuItem = ({
  displayName,
  text,
  currentTime,
  docId,
  likes,
  comments,
}) => {
  const { currentUser } = useContext(UserContext);

  const handleLikeButton = async () => {
    let isAlreadyLikedIt = await checkIfUsersAlreadyLikedIt(currentUser.uid);
    await updateLikes(docId, isAlreadyLikedIt, currentUser.uid);
    isAlreadyLikedIt
      ? setLikesValue(likesValue - 1)
      : setLikesValue(likesValue + 1);
  };

  const handleCommentButton = async () => {
    console.log("i comment it");
    setCommentsValue(commentsValue + 1);
  };

  const [likesValue, setLikesValue] = useState(likes);
  const [commentsValue, setCommentsValue] = useState(comments);

  let d = new Date(currentTime);
  return (
    <Card id="Menu-item-card">
      <Card.Body>
        <Card.Title>
          {displayName} <h6>{d.toString()}</h6>
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button onClick={handleLikeButton} id="Button-card">
          {likesValue} Likes
        </Button>
        <Button onClick={handleCommentButton} id="Button-card">
          {commentsValue} Comments
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MenuItem;
