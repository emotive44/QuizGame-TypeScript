import React, { FC, useState } from "react";
import "./App.css";

import PriceAside from "./components/price-aside/PriceAside";
import QuizSection from "./components/quiz-section/QuizSection";
import RecordsAside from "./components/records-aside/RecordsAside";

import { Provider } from "react-redux";
import store from "./store/store";

const App: FC = () => {
  const [money, setWinMoney] = useState(0);
  const [finishGame, setFinishGame] = useState(false);
  const [frJoker, setFrJoker] = useState(false);
  const [publJoker, setPublJoker] = useState(false);

  return (
    <Provider store={store}>
      <main>
        <RecordsAside />
        <QuizSection
          money={money}
          setMoney={setWinMoney}
          finishGame={finishGame}
          setFinishGame={setFinishGame}
          frJoker={frJoker}
          setFrJoker={setFrJoker}
          publJoker={publJoker}
          setPublJoker={setPublJoker}
        />
        <PriceAside
          setMoney={setWinMoney}
          setFinishGame={setFinishGame}
          setFrJoker={setFrJoker}
          setPublJoker={setPublJoker}
        />
      </main>
    </Provider>
  );
};

export default App;
