import React, { FC } from "react";
import "./RecordsAside.css";

import UserItem from "./UserItem";

const RecordsAside: FC = () => {
  return (
    <aside className="records">
      <h2 className="title">Top 10</h2>

      <div className="users-container">
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </div>
    </aside>
  );
};

export default RecordsAside;
