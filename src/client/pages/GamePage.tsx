import React from "react";
import { gql, SubscriptionOptions } from "@apollo/client";
import { useDispatch, connect } from "react-redux";

import { updateChat } from "../actions";
import { useSubscription } from "../hooks/useSubscription";

const GamePage = ({ chat, chatId }: { chat: any[]; chatId: string }) => {
  const dispatch = useDispatch();

  const CHAT_SUBSCRIPTION = gql`
    subscription Subscription($id: String) {
      chat(id: $id) {
        message
      }
    }
  `;

  const chatSubscription: SubscriptionOptions = {
    query: CHAT_SUBSCRIPTION,
    variables: { id: chatId },
  };

  const observer = {
    next({ data }: { data: any }) {
      const message = data.chat.message;
      dispatch(updateChat(message));
    },
  };

  useSubscription(chatSubscription, observer);

  return (
    <>
      {chat.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  );
};

function mapStateToProps(state: any) {
  return { chat: state.chat };
}

export default {
  component: connect(mapStateToProps, null)(GamePage),
};
