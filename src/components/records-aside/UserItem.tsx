import React, { FC } from "react";
import "./UserItem.css";

interface UserItemProps {
  index: number;
  money: number;
  name: string;
}

const UserItem: FC<UserItemProps> = ({ index, money, name }) => {
  return (
    <div className="user">
      <span>{index}.</span>
      <span>{money}lv.</span>
      <span>{name}</span>
    </div>
  );
};

export default UserItem;
