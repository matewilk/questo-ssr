import React from "react";
import * as redux from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { renderWithStore } from "test-utils";

import { apolloClient } from "helpers/webSocketClient";
process.env.QUESTO_SSR_WS_URL = "http://localhost:1234/api";

import { useChatSubscription } from "client/hooks/useChatSubscription";
import * as chatSlice from "client/features/chat";

const Wrapper = ({ id }: { id: string }): null => {
  const observer = useChatSubscription({ id });
  observer.next({ data: { chat: { message: "test message" } } });
  return null;
};

describe("useChatSubscription", () => {
  let useDispatchSpy: any;
  let updateChatSpy: Function;

  beforeEach(() => {
    useDispatchSpy = jest
      .spyOn(redux, "useDispatch")
      .mockImplementation(() => (f) => f);
    // @ts-ignore
    updateChatSpy = jest.spyOn(chatSlice, "updateChat");

    renderWithStore(
      <ApolloProvider client={apolloClient()}>
        <Wrapper id={"123"} />
      </ApolloProvider>
    );
  });

  it("updates chat after receiving messages from server", async () => {
    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await updateChatSpy).toHaveBeenCalledWith("test message");
  });
});
