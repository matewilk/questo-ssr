import { useDispatch } from "react-redux";
import { gql, SubscriptionOptions } from "@apollo/client";

import { updateGame } from "../features/game";
import { useSubscription } from "./useSubscription";

export const useGameSubscription = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const GAME_SUBSCRIPTION = gql`
    subscription Subscription($id: String) {
      game(id: $id) {
        key
      }
    }
  `;

  const gameSubscription: SubscriptionOptions = {
    query: GAME_SUBSCRIPTION,
    variables: { id: id },
  };

  const observer = {
    next({ data }: { data: any }) {
      const key = data.game.key;
      dispatch(updateGame(key));
    },
  };

  useSubscription(gameSubscription, observer);

  // return for testing only
  return observer;
};
