import React, { FC, useState } from "react";
import "./QuizSection.css";

import { RootState } from "../../store/store";
import { saveNickname } from "../../store/globalActions";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: RootState) => ({
  user: state.global.nickname,
});

const mapDispatch = {
  saveNickname: saveNickname,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  someProp: string;
};

const QuizSection: FC<Props> = ({ someProp, user, saveNickname }) => {
  const [start, setStart] = useState(true);
  const [nickname, setNickname] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
                setStart(false);
                saveNickname(nickname);
              }}
              disabled={errMsg === "correct" ? false : true}
            >
              Start Game
            </button>
          </form>
        </section>
      ) : (
        <section>
          game {someProp}, {user}
        </section>
      )}
    </section>
  );
};

export default connector(QuizSection);
