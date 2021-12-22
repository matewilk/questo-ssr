import React from "react";
import { useHistory } from "react-router-dom";
import { useInput } from "../hooks/useInput";

const JoinGamePage = () => {
  const [gameIdProps, resetGameId] = useInput("");
  const history = useHistory();

  const joinGame = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/game/${gameIdProps.value}`);
    resetGameId();
  };

  const center = {
    display: "grid",
    justifyItems: "center",
  };

  return (
    <div style={center}>
      <form onSubmit={joinGame}>
        <input
          {...gameIdProps}
          type="text"
          placeholder="game id ...."
          required
        />
        <button>Start</button>
      </form>
    </div>
  );
};

export default {
  component: JoinGamePage,
};
