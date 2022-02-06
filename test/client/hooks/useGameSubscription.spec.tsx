import React from "react";
import * as redux from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { renderWithStore } from "test-utils";

import { apolloClient } from "helpers/webSocketClient";
process.env.QUESTO_SSR_WS_URL = "http://localhost:1234/api";

import { useGameSubscription } from "client/hooks/useGameSubscription";
import * as gameSlice from "client/features/game";

const Wrapper = ({ id }: { id: string }): null => {
  const observer = useGameSubscription({ id });
  observer.next({ data: { game: { key: "d" } } });
  return null;
};

describe("useGameSubscription", () => {
  let useDispatchSpy: any;
  let updateGameSpy: Function;

  beforeEach(() => {
    useDispatchSpy = jest
      .spyOn(redux, "useDispatch")
      .mockImplementation(() => (f) => f);
    // @ts-ignore
    updateGameSpy = jest.spyOn(gameSlice, "updateGame");

    renderWithStore(
      <ApolloProvider client={apolloClient()}>
        <Wrapper id={"123"} />
      </ApolloProvider>
    );
  });

  it("updates chat after receiving messages from server", async () => {
    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await updateGameSpy).toHaveBeenCalledWith("d");
  });
});
