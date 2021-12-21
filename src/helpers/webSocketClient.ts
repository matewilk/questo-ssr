import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import ws from "ws";

export const apolloClient = (browser = false) => {
  const WS_ENDPOINT = "ws://localhost:4000/api"; // process.env.QUESTO_API_WS_URL;

  const wsLinkOptions = {
    uri: WS_ENDPOINT,
    options: { reconnect: true },
    ...(!browser && { webSocketImpl: ws }),
  };

  const wsLink = new WebSocketLink(wsLinkOptions);

  // const client = new SubscriptionClient(WS_ENDPOINT, { reconnect: true });

  return new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
    // networkInterface: client,
  });
};
