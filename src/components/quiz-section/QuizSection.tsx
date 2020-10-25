import React, { FC, useState, Fragment } from "react";
import "./QuizSection.css";

import { RootState } from "../../store/store";
import { saveNickname, currentQuestion } from "../../store/globalActions";
import { connect, ConnectedProps } from "react-redux";

const letters = new Map([
  [1, "A"],
  [2, "B"],
  [3, "C"],
  [4, "D"],
]);

const mapState = (state: RootState) => ({
  user: state.global.nickname,
});

const mapDispatch = {
  saveNickname: saveNickname,
  currentQuestion,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  someProp: string;
};

const QuizSection: FC<Props> = ({
  someProp,
  user,
  saveNickname,
  currentQuestion,
}) => {
  const [start, setStart] = useState(true);
  const [nickname, setNickname] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorretAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

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
    setStart(false);
    currentQuestion(0);
    saveNickname(nickname);
    getQuestion();
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
      ) : (
        <Fragment>
          <div
            className="question"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <div className="answers-container">
            {answers?.map((x, i) => {
              return (
                <div className="answer" key={x} onClick={() => {}}>
                  <span className="bold-letters">{letters.get(i + 1)})</span>
                  <span dangerouslySetInnerHTML={{ __html: x }} />
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default connector(QuizSection);
