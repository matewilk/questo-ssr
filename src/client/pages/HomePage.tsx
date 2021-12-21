import React from "react";

import { useInput } from "../hooks/useInput";

const HomePage = () => {
  const [gameIdProps, resetGameId] = useInput("");

  const startGame = (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      resetGameId();
  };

  return (
    <div>
      <div>I'm the home component</div>
      <form onSubmit={startGame}>
        <input {...gameIdProps} type="text" placeholder="gameId...." required />
      </form>
      <button onClick={() => console.log("test")}>Press me</button>
    </div>
  );
};

export default {
  component: HomePage,
};
