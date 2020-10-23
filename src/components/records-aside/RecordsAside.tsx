import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecordsAside.css";

import UserItem from "./UserItem";

import { RootState } from "../../store/store";
import { saveNickname } from "../../store/globalActions";

const RecordsAside: FC = () => {
  const user = useSelector((state: RootState) => state.global.nickname);
  const dispatch = useDispatch();

  const changeNickname = () => {
    dispatch(saveNickname("changedName"));
  };

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
        <p onClick={changeNickname}>{user}</p>
      </div>
    </aside>
  );
};

export default RecordsAside;
