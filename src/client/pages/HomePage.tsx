import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";

import { GameState, generateGameId } from "../features/game";

const HomePage = ({ gameId }: { gameId: string }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(generateGameId());
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

const mapStateToProps = ({ game }: { game: GameState }) => ({
  gameId: game.id,
});

export default {
  loadData: ({ dispatch }: { dispatch: Dispatch }) => {
    return dispatch<any>(generateGameId());
  },
  component: connect(mapStateToProps)(HomePage),
};
