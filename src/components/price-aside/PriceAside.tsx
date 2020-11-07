import React, { FC, useEffect } from "react";
import "./PriceAside.css";
import MoneyItem from "./MoneyItem";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";
import { saveUserRecord } from "../../store/globalActions";
import { getWinMoney } from "../../utils/getWinMoney";

export const questionPrice = [
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
  nickname: state.global.nickname,
  correctAnswer: state.global.correctAns,
});

const mapDispatch = {
  saveUserRecord,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  setMoney: Function;
  setFinishGame: (x: boolean) => void;
  setFrJoker: (x: boolean) => void;
  setPublJoker: (x: boolean) => void;
};

const PriceAside: FC<Props> = ({
  currQuest,
  nickname,
  setMoney,
  correctAnswer,
  setFinishGame,
  saveUserRecord,
  setPublJoker,
  setFrJoker,
}) => {
  const questNum = currQuest ? currQuest : 0;

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

  const markedJoker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.className = "marked";
  };

  const friendJoker = (e: React.MouseEvent<HTMLButtonElement>) => {
    markedJoker(e);
    setFrJoker(true);
  };

  const fiftyFiftyJoker = (e: React.MouseEvent<HTMLButtonElement>) => {
    let removedAns = 0;

    markedJoker(e);

    Array.from(
      document.getElementsByClassName("answer") as HTMLCollectionOf<HTMLElement>
    ).forEach((div) => {
      Array.from(div.childNodes).forEach((span, i) => {
        if (i % 2 !== 0 && removedAns < 2) {
          if (span.textContent !== correctAnswer) {
            span.textContent = "";
            removedAns++;
          }
        }
      });
    });
  };

  const publicJoker = (e: React.MouseEvent<HTMLButtonElement>) => {
    markedJoker(e);
    setPublJoker(true);
  };

  const takeMoney = () => {
    const winMoney = getWinMoney(questNum, true);

    const userRecord = {
      nickname: nickname || "",
      winMoney: winMoney || 0,
    };

    setMoney(winMoney);
    setFinishGame(true);
    saveUserRecord(userRecord);
  };

  return (
    <aside className="price">
      <div className="jokers">
        <button onClick={publicJoker} disabled={questNum < 1 ? true : false}>
          Public
        </button>
        <button
          onClick={fiftyFiftyJoker}
          disabled={questNum < 1 ? true : false}
        >
          50/50
        </button>
        <button onClick={friendJoker} disabled={questNum < 1 ? true : false}>
          Friend
        </button>
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
      <button
        className="take-money"
        onClick={takeMoney}
        disabled={!nickname || questNum <= 1 ? true : false}
      >
        Take a money
      </button>
    </aside>
  );
};

export default connector(PriceAside);
