import React from "react";
import { gql, SubscriptionOptions } from "@apollo/client";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";

import { updateChat } from "../features/chat";
import { useSubscription } from "../hooks/useSubscription";
import { useKeyPress } from "../hooks/useKeyPress";
import { GameState, getRandomSentence, selectLetter } from "../features/game";

import LetterBoard from "../components/LetterBoard";
import { Store } from "redux";

const GamePage = ({ chat, sentence }: { chat: any[]; sentence: string[] }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useKeyPress({ callback: selectLetter });

  const CHAT_SUBSCRIPTION = gql`
    subscription Subscription($id: String) {
      chat(id: $id) {
        message
      }
    }
  `;

  const chatSubscription: SubscriptionOptions = {
    query: CHAT_SUBSCRIPTION,
    variables: { id: id },
  };

  const observer = {
    next({ data }: { data: any }) {
      const message = data.chat.message;
      dispatch(updateChat(message));
    },
  };

  useSubscription(chatSubscription, observer);

  const center = {
    display: "grid",
    justifyItems: "center",
  };

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

function mapStateToProps({ chat, game }: { chat: any; game: GameState }) {
  return { chat: chat, sentence: game.sentence };
}

const loadData = (store: Store) => {
  return store.dispatch<any>(getRandomSentence());
};
export default {
  loadData,
  component: connect(mapStateToProps, null)(GamePage),
};
