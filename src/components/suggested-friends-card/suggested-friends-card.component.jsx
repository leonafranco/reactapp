import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { updateFollowers } from "../../firebase/firebase";

const SuggestedFriendsCard = ({
  displayName,
  email,
  suggestedFriendUserId,
  currentUserId,
}) => {
  const handleFollowUser = async () => {
    await updateFollowers(suggestedFriendUserId, currentUserId, false);
  };

  return (
    <Card id="Menu-item-card">
      <Card.Body>
        <Card.Title>{displayName}</Card.Title>
        <Card.Text>{email}</Card.Text>
        <Button onClick={handleFollowUser}>Follow Me!</Button>
      </Card.Body>
    </Card>
  );
};

export default SuggestedFriendsCard;
