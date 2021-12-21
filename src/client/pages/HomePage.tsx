import React from "react";
import { useHistory } from "react-router-dom";

import { useInput } from "../hooks/useInput";

const HomePage = () => {
  const [gameIdProps, resetGameId] = useInput("");
  const history = useHistory();

  const startGame = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/game/${gameIdProps.value}`);
    resetGameId();
  };

  return (
    <div>
      <div>Type game id</div>
      <form onSubmit={startGame}>
        <input {...gameIdProps} type="text" placeholder="gameId...." required />
        <button>Start</button>
      </form>
    </div>
  );
};

export default {
  component: HomePage,
};
