import React, { FC } from "react";
import "./App.css";

import PriceAside from "./components/price-aside/PriceAside";
import QuizSection from "./components/quiz-section/QuizSection";
import RecordsAside from "./components/records-aside/RecordsAside";

import { Provider } from "react-redux";
import store from "./store/store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <main>
        <RecordsAside />
        <QuizSection someProp="someprop" />
        <PriceAside />
      </main>
    </Provider>
  );
};

export default App;
