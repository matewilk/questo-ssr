import { useDispatch } from "react-redux";
import { gql, SubscriptionOptions } from "@apollo/client";

import { updateChat } from "../features/chat";
import { useSubscription } from "./useSubscription";

export const useChatSubscription = ({ id }: { id: string }) => {
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
    variables: { id: id },
  };

  const observer = {
    next({ data }: { data: any }) {
      const message = data.chat.message;
      dispatch(updateChat(message));
    },
  };

  useSubscription(chatSubscription, observer);

  // return for testing only
  return observer;
};
