import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    const newId = Math.random().toString(36).substring(2, 7);
    setGameId(newId);
  }, []);

  const center = {
    display: "grid",
    justifyItems: "center",
  };

  return (
    <div style={center}>
      <div>Menu</div>
      <div>
        <Link to={`/game/${gameId}`}>New Game</Link>
      </div>
      <div>
        <Link to="/join">Join Game</Link>
      </div>
    </div>
  );
};

export default {
  component: HomePage,
};
