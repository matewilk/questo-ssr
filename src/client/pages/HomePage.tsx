import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const center = {
    display: "grid",
    justifyItems: "center",
  };

  return (
    <div style={center}>
      <div>Menu</div>
      <div>
        <Link to="/game">New Game</Link>
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
