import React, { FC } from "react";
import "./MoneyItem.css";

interface MoneyItemProps {
  last?: boolean;
  count: number;
  win?: boolean;
  money: number;
}

const MoneyItem: FC<MoneyItemProps> = ({ last, count, win, money }) => {
  return (
    <div
      className={`money-count ${last ? "last" : ""}`}
      id={`moneyCount-${count}`}
    >
      <span className={win ? "win" : ""}>{count}</span>
      <span className={`money ${win ? "win" : ""}`}>{money} leva</span>
    </div>
  );
};

export default MoneyItem;
