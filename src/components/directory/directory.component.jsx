import React, { Fragment, useContext } from "react";
import MenuItem from "../menu-item/menuItem.component";

import { PostContext } from "../../context/posts.context";

const Directory = () => {
  const { postsMap } = useContext(PostContext);
  return (
    <Fragment>
      {Object.keys(postsMap).map((key) => (
        <Fragment key={key}>
          <div className="directory-pub">
            <MenuItem
              displayName={postsMap[key].displayName}
              currentTime={postsMap[key].currentTime}
              text={postsMap[key].text}
              docId={key}
              likes={postsMap[key].likes}
            />
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Directory;
