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

  const nickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.currentTarget.value);
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
            </div>
            <button
              type="submit"
              onClick={() => {
                setStart(false);
                saveNickname(nickname);
              }}
              disabled={nickname.length > 6 ? false : true}
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
