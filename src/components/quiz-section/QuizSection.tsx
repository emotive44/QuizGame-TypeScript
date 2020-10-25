import React, { FC, useState, Fragment, useEffect } from "react";
import "./QuizSection.css";

import { RootState } from "../../store/store";
import {
  saveNickname,
  currentQuestion,
  saveUserRecord,
} from "../../store/globalActions";
import { connect, ConnectedProps } from "react-redux";
import { getWinMoney } from "../../utils/getWinMoney";

const letters = new Map([
  [1, "A"],
  [2, "B"],
  [3, "C"],
  [4, "D"],
]);

const mapState = (state: RootState) => ({
  user: state.global.nickname,
  currQuest: state.global.currQuest,
});

const mapDispatch = {
  saveNickname: saveNickname,
  currentQuestion,
  saveUserRecord,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  money: number;
  setMoney: Function;
  finishGame: boolean;
  setFinishGame: (x: boolean) => void;
};

const QuizSection: FC<Props> = ({
  user,
  money,
  setMoney,
  currQuest,
  finishGame,
  saveNickname,
  setFinishGame,
  currentQuestion,
  saveUserRecord,
}) => {
  const [start, setStart] = useState(true);
  const [nickname, setNickname] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorretAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  let questionNum = currQuest ? currQuest : 0;
  let currPrice = document.getElementById(`moneyCount-${currQuest}`);

  const nickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const nicknameValue = e.currentTarget.value;

    setNickname(nicknameValue);

    if (nicknameValue.length < 1) {
      setErrMsg("Nickname is required");
    } else if (nicknameValue.match(/^\d/)) {
      setErrMsg("Nickname can not start with number");
    } else if (nicknameValue.length < 5) {
      setErrMsg("Nickname should be more then 5 characters");
    } else {
      setErrMsg("correct");
    }
  };

  const startGame = () => {
    currPrice = document.getElementById(`moneyCount-1`);
    if (currPrice) {
      currPrice.style.background = "lightgray";
    }

    setStart(false);
    currentQuestion(1);
    saveNickname(nickname);
    getQuestion();
  };

  const restartGame = () => {
    if (currPrice) {
      currPrice.style.background = "transparent";
    }

    startGame();
    setGameOver(false);
    setQuestion("");
    setAnswers([]);
    setFinishGame(false);
  };

  const changeNickname = () => {
    if (currPrice) {
      currPrice.style.background = "transparent";
    }

    setStart(true);
    setNickname("");
    setGameOver(false);
    setQuestion("");
    setAnswers([]);
    setFinishGame(false);
    setErrMsg("");
  };

  const getQuestion = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple"
    );
    const data = await res.json();
    const shakedAnswers: string[] = [
      ...data.results[0].incorrect_answers,
      data.results[0].correct_answer,
    ].sort(() => 0.5 - Math.random());

    setQuestion(data.results[0].question);
    setCorretAnswer(data.results[0].correct_answer);
    setAnswers(shakedAnswers);
  };

  const winMoney = () => {
    const winMoney = getWinMoney(questionNum, false);
    const userRecord = {
      nickname,
      winMoney: winMoney || 0,
    };

    setMoney(winMoney);
    saveUserRecord(userRecord);
  };

  const chooseAnswer = (e: React.MouseEvent<HTMLDivElement>) => {
    const currElem = e.currentTarget;
    const markedAnswer = currElem.childNodes[1].textContent;

    if (correctAnswer === markedAnswer) {
      currElem.style.background = "green";
      currentQuestion(++questionNum);
      setTimeout(() => {
        getQuestion();
      }, 1000);
    } else {
      Array.from(
        document.getElementsByClassName("answer") as HTMLCollectionOf<
          HTMLElement
        >
      ).forEach((x) => {
        Array.from(x.childNodes).forEach((y) => {
          if (y.textContent === correctAnswer) {
            x.style.background = "green";
          }

          x.style.pointerEvents = "none";
        });
      });

      setTimeout(() => {
        setGameOver(true);
      }, 1000);

      setFinishGame(false);
      winMoney();

      currElem.style.background = "red";
    }
  };

  useEffect(() => {
    if (finishGame) {
      setGameOver(true);
    }
  }, [finishGame]);

  return (
    <section className="quiz">
      {start ? (
        <section className="start-game">
          <form>
            <div>
              <label htmlFor="nickname">Your Nickname</label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                value={nickname}
                onChange={nickNameHandler}
                placeholder="e.g. nickname44"
              />
              <p
                className={`nickname-validation ${
                  errMsg === "correct" ? "correct" : "err"
                }`}
              >
                {errMsg === "correct" ? "Nickname is correct" : errMsg}
              </p>
            </div>
            <button
              type="submit"
              onClick={() => {
                startGame();
              }}
              disabled={errMsg === "correct" ? false : true}
            >
              Start Game
            </button>
          </form>
        </section>
      ) : gameOver ? (
        <Fragment>
          <div className={`finish-game ${finishGame ? "taked-money" : ""}`}>
            Game Over!!
            <div>
              <span onClick={changeNickname}>Change nickname</span>
              <span onClick={restartGame}>Continue</span>
            </div>
          </div>
          <p className="money-notification">
            {money === 0
              ? "Unfortunately you win 0leva"
              : `You win ${money}leva`}
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <header>
            <span>Good Luck, {user}!</span>
          </header>
          <div
            className="question"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <div className="answers-container">
            {answers?.map((x, i) => {
              return (
                <div className="answer" key={x} onClick={chooseAnswer}>
                  <span className="bold-letters">{letters.get(i + 1)})</span>
                  <span dangerouslySetInnerHTML={{ __html: x }} />
                </div>
              );
            })}
          </div>

          <footer></footer>
        </Fragment>
      )}
    </section>
  );
};

export default connector(QuizSection);
