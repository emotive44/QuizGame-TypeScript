import React, { FC } from "react";
import "./App.css";

import PriceAside from "./components/price-aside/PriceAside";
import QuizSection from "./components/quiz-section/QuizSection";
import RecordsAside from "./components/records-aside/RecordsAside";

const App: FC = () => {
  return (
    <main>
      <RecordsAside />
      <QuizSection />
      <PriceAside />
    </main>
  );
};

export default App;
