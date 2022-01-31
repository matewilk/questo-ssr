import { useEffect } from "react";
import { useDispatch } from "react-redux";

// create array containing only english letters
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());

export function useKeyPress({ callback }: { callback: Function }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = ({ key }: { key: string }) => {
      const letter = key.toLowerCase();
      if (alphabet.indexOf(letter) !== -1) {
        dispatch(callback(letter));
      }
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [callback]);
}
