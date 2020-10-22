import React, { FC } from "react";
import "./PriceAside.css";

import MoneyItem from "./MoneyItem";

const questionPrice = [
  100000,
  25000,
  10000,
  5000,
  2500,
  2000,
  1500,
  1000,
  500,
  250,
  200,
  150,
  100,
  50,
];

const PriceAside: FC = () => {
  return (
    <aside className="price">
      <div className="jokers">
        <div>Public</div>
        <div>50/50</div>
        <div>Friend</div>
      </div>

      {questionPrice.map((x, i) => {
        return (
          <MoneyItem
            count={questionPrice.length - i}
            key={x}
            money={x}
            last={x === 50 && true}
            win={[250, 2500, 100000].includes(x)}
          />
        );
      })}
      <div className="take-money">Take a money</div>
    </aside>
  );
};

export default PriceAside;
