import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { sendKeyPress } from "../features/game";

// create array containing only english letters
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());

export function useKeyPress({ id }: { id: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = ({ key }: { key: string }) => {
      const letter = key.toLowerCase();
      if (alphabet.indexOf(letter) !== -1) {
        dispatch(sendKeyPress({ gameId: id, key: letter }));
      }
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);
}
