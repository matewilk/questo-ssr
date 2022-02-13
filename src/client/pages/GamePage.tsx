import React, { useEffect } from "react";
import { Store } from "redux";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useKeyPress } from "../hooks/useKeyPress";
import { useChatSubscription } from "../hooks/useChatSubscription";
import { useGameSubscription } from "../hooks/useGameSubscription";
import { getRandomSentence } from "../features/game";

import LetterBoard from "../components/LetterBoard";

const GamePage = ({ chat }: { chat: any[] }) => {
  const { id }: { id: string } = useParams();
  useKeyPress({ id });
  useChatSubscription({ id });
  useGameSubscription({ id });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomSentence());
  }, []);

  const center = {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    height: "100%",
  } as React.CSSProperties;

  return (
    <div style={center}>
      <div>Game Page</div>
      {chat.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <LetterBoard />
    </div>
  );
};

function mapStateToProps({ chat }: { chat: any }) {
  return { chat: chat };
}

const loadData = (store: Store) => {
  return store.dispatch<any>(getRandomSentence());
};
export default {
  loadData,
  component: connect(mapStateToProps, null)(GamePage),
};
