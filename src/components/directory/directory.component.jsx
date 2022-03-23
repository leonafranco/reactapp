import React from "react";
import MenuItem from "../menu-item/menuItem.component";

const Directory = ({ publication }) => {
  return (
    <div className="directory-pub">
      {publication.map(({ title, text, id }) => (
        <MenuItem key={id} title={title} text={text} />
      ))}
    </div>
  );
};

export default Directory;
