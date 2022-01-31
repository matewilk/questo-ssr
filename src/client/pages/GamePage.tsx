import React, { useEffect } from "react";
import { gql, SubscriptionOptions } from "@apollo/client";
import { useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";

import { updateChat } from "../actions";
import { useSubscription } from "../hooks/useSubscription";
import { useKeyPress } from "../hooks/useKeyPress";
import { selectLetter } from "../reducers/game";

import LetterBoard from '../components/LetterBoard';

const GamePage = ({ chat }: { chat: any[] }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useKeyPress({callback: selectLetter});

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

function mapStateToProps(state: any) {
  return { chat: state.chat };
}

export default {
  component: connect(mapStateToProps, null)(GamePage),
};
