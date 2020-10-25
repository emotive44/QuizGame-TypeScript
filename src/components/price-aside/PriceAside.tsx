import React, { FC, useEffect } from "react";
import "./PriceAside.css";
import MoneyItem from "./MoneyItem";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";

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

const mapState = (state: RootState) => ({
  currQuest: state.global.currQuest,
});

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

const PriceAside: FC<Props> = ({ currQuest }) => {
  useEffect(() => {
    if (currQuest === 1) {
      const currentPrice = document.getElementById(`moneyCount-${currQuest}`);
      if (currentPrice) {
        currentPrice.style.background = "lightgray";
      }
      return;
    }

    const lastPrice = document.getElementById(
      `moneyCount-${currQuest && currQuest - 1}`
    );
    const nextPrice = document.getElementById(
      `moneyCount-${currQuest && currQuest}`
    );

    if (lastPrice && nextPrice) {
      lastPrice.style.background = "transparent";
      nextPrice.style.background = "lightgray";
    }
  }, [currQuest]);

  const markedJoker = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.className = "marked";
  };

  const takeMoney = () => {
    console.log(currQuest);
  };

  return (
    <aside className="price">
      <div className="jokers">
        <div onClick={markedJoker}>Public</div>
        <div onClick={markedJoker}>50/50</div>
        <div onClick={markedJoker}>Friend</div>
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
      <div className="take-money" onClick={takeMoney}>
        Take a money
      </div>
    </aside>
  );
};

export default connector(PriceAside);
