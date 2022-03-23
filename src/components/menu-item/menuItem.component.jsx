import React from "react";

import "./menuItem.styles.scss";

const MenuItem = ({ title, text }) => {
  return (
    <div className="menuItem">
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">{text}</span>
      </div>
    </div>
  );
};

export default MenuItem;
