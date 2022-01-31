import React, { useEffect }  from "react";
import { connect, useDispatch } from "react-redux";

import LetterBox from "./LetterBox";
import { GameState, getRandomSentence } from "../reducers/game";

export const LetterBoard = ({ sentence = [] }: { sentence?: string[] }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomSentence())
  }, [])

  return (
    <>
      {sentence.map((letter: string, index: number) => (
        <LetterBox key={`${letter}-${index}`} letter={letter} />
      ))}
    </>
  );
};

const mapStateToProps = ({ game }: { game: GameState }) => ({
  sentence: game.sentence,
});

export default connect(mapStateToProps, null)(LetterBoard);
