import React, { FC, useState } from "react";
import "./QuizSection.css";

const QuizSection: FC = () => {
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
              onClick={() => setStart(false)}
              disabled={nickname.length > 6 ? false : true}
            >
              Start Game
            </button>
          </form>
        </section>
      ) : (
        <section> game</section>
      )}
    </section>
  );
};

export default QuizSection;
