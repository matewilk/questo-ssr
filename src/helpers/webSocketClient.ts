import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import ws from "ws";

export const apolloClient = (browser = false) => {
  const WS_ENDPOINT = process.env.REACT_APP_QUESTO_SSR_WS_URL;

  const wsLinkOptions = {
    uri: WS_ENDPOINT,
    options: { reconnect: true },
    ...(!browser && { webSocketImpl: ws }),
  };

  const wsLink = new WebSocketLink(wsLinkOptions);

  return new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
};
