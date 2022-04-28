import React, { Fragment, useContext } from "react";
import SuggestedFriendsCard from "../suggested-friends-card/suggested-friends-card.component";

import { SuggestedFriendsContext } from "../../context/suggestedFriends.context";
import { UserContext } from "../../context/user.context";

const SuggestedFriends = () => {
  const { currentUser } = useContext(UserContext);
  const { suggestedFriendsMap } = useContext(SuggestedFriendsContext);
  return (
    <Fragment>
      <h6>Suggestions for you</h6>
      {Object.keys(suggestedFriendsMap).map((key) => (
        <Fragment key={key}>
          <div className="directory-pub">
            <SuggestedFriendsCard
              displayName={suggestedFriendsMap[key].displayName}
              email={suggestedFriendsMap[key].email}
              suggestedFriendUserId={key}
              currentUserId={currentUser.reloadUserInfo.localId}
            />
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default SuggestedFriends;
