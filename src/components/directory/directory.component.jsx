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
              key={postsMap[key].displayName}
              title={postsMap[key].text}
              text={postsMap[key].text}
            />
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Directory;
