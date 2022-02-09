import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import LetterBox from "./LetterBox";
import { GameState } from "../features/game";

const style = {
  display: "flex",
  flexDirection: "row",
  gap: "3em",
};

export const LetterBoard = ({ sentence = [] }: { sentence?: string[] }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getRandomSentence())
  // }, [])

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
