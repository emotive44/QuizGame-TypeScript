import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecordsAside.css";

import UserItem from "./UserItem";

import { RootState } from "../../store/store";
// import { saveNickname } from "../../store/globalActions";

const RecordsAside: FC = () => {
  const usersRecords = useSelector((state: RootState) => state.global.users);
  // const dispatch = useDispatch();

  // const changeNickname = () => {
  //   dispatch(saveNickname("changedName"));
  // };

  return (
    <aside className="records">
      <h2 className="title">Top 10</h2>
      {usersRecords
        .sort((a, b) => b.winMoney - a.winMoney)
        .map((user, i) => {
          return (
            <UserItem
              index={i + 1}
              money={user.winMoney}
              name={user.nickname}
            />
          );
        })}

      {usersRecords.length < 1 && (
        <p style={{ textAlign: "center" }}>Does not have any records yet.</p>
      )}
      <div className="users-container"></div>
    </aside>
  );
};

export default RecordsAside;
