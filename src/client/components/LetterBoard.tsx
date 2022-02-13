import React from "react";
import { connect } from "react-redux";

import LetterBox from "./LetterBox";
import { GameState } from "../features/game";

const style = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6rem",
};

export const LetterBoard = ({ sentence = [] }: { sentence?: string[] }) => {
  return (
    <div style={style as React.CSSProperties}>
      {sentence.map((letter: string, index: number) => (
        <LetterBox key={`${letter}-${index}`} letter={letter} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ game }: { game: GameState }) => ({
  sentence: game.sentence,
});

export default connect(mapStateToProps, null)(LetterBoard);
