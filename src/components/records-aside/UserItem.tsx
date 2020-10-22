import React, { FC } from "react";
import "./UserItem.css";

const UserItem: FC = () => {
  return (
    <div className="user">
      <span>1.</span>
      <span>50lv.</span>
      <span>Marko Streleshki</span>
    </div>
  );
};

export default UserItem;
