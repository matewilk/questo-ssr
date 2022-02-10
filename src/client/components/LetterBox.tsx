import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSpring, useTransition, a } from "react-spring";

import { GameState } from "../features/game";

const boxStyle = {
  width: "3em",
  height: "3em",
};

const cardStyle = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3em",
  height: "3em",
  border: "1px solid black",
  borderRadius: "0.2em",
  willChange: "transform, opacity",
  fontSize: "24px",
} as React.CSSProperties;

const hide = { opacity: 0 };
const show = { opacity: 1 };

export const LetterBox = ({
  letter,
  guess,
}: {
  letter?: string;
  guess?: string;
}) => {
  const [displayedLetter, setDisplayedLetter] = useState("");
  // @ts-ignore
  const flipped = displayedLetter.length == true;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(100px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const transitions = useTransition(displayedLetter, {
    from: hide,
    enter: show,
    leave: hide,
    opacity: flipped ? 1 : 0,
    // transform: `perspective(100px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    // onRest: () => setItems([]),
  });

  useEffect(() => {
    if (letter && guess && letter.toLowerCase() === guess.toLowerCase()) {
      setDisplayedLetter(letter);
    }
  }, [letter, guess]);

  return (
    <div style={boxStyle as React.CSSProperties}>
      {/* <a.div
        style={{
          ...cardStyle,
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
        data-testid="letter-box"
      />
      <a.div
        style={{
          ...cardStyle,
          opacity,
          transform,
          rotateX: "180deg",
        }}
        data-testid="letter-box"
      >
        {displayedLetter}
      </a.div> */}
      {transitions(({ opacity }, letter) => {
        console.log(letter);
        return (
          <a.div
            style={{
              ...cardStyle,
              transform: transform,
              opacity: opacity.to({
                range: [0, 0.5, 1],
                output: [0, 0, 1],
              }),
              rotateX: "180deg",
            }}
          >
            {letter}
          </a.div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ game }: { game: GameState }) => ({
  guess: game.letter,
});

export default connect(mapStateToProps, null)(LetterBox);
