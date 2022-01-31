import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { GameState } from "../reducers/game";

export const LetterBox = ({
  letter,
  guess,
}: {
  letter?: string;
  guess?: string;
}) => {
  const [displayedLetter, setDisplayedLetter] = useState("");

  useEffect(() => {
    if (letter && guess && letter.toLowerCase() === guess.toLowerCase()) {
      setDisplayedLetter(letter);
    }
  }, [letter, guess]);

  return <div data-testid="letter-box">{displayedLetter}</div>;
};

const mapStateToProps = ({ game }: { game: GameState }) => ({
  guess: game.letter,
});

export default connect(mapStateToProps, null)(LetterBox);
