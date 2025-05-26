import React from 'react';
import { useParams } from 'react-router-dom';
import QuizForm from './quizForm';
import WordHuntForm from './WordHuntForm';
import ColumnMatchForm from './ColumnMatchForm';

function GameCreate() {
  const { gameCreate: id } = useParams();

  const renderForm = () => {
    switch (id) {
      case "createquiz":
      case "createdraganddrop":
      case "createfillintheblank":
        return <QuizForm />;
      case "createwordhunt":
        return <WordHuntForm />;
      default:
        return <ColumnMatchForm />;
    }
  };

  return (
    <div className="pb-3 px-3 pr-3">
      <header className="text-xl font-semibold my-3">New Game</header>
      {renderForm()}
    </div>
  );
}

export default GameCreate;
