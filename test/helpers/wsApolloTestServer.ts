import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from "graphql-subscriptions";

import gameSchema from "./gameSchema";
import gameResolver from "./gameResolver";
import chatSchema from "./chatSchema";
import chatResolver from "./chatResolver";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const typeDefs = [linkSchema, gameSchema, chatSchema];
const resolvers = [gameResolver, chatResolver];

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const gqServer = async () => {
  const app = express();
  app.use(express.json());
  const httpServer = createServer(app);

  const RANDOM_WS_PORT = Math.floor(Math.random() * 10000);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const pubSub = new PubSub();

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: () => {
      return {
        pubSub: pubSub,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(connectionParams, webSocket, context) {
        console.log("Connected to Apollo WebSocket Test Server!");
        // pass context to Apollo/GraphQL Subscription subscribe handler
        return { ...context, pubSub: pubSub };
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected from Apollo Websocket Test Server!");
      },
    },
    { server: httpServer, path: "/api" }
  );

  // The uri of the WebSocketLink has to match the customServer uri.
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:${RANDOM_WS_PORT}/api`,
  });

  const apolloClient = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: RANDOM_WS_PORT }, resolve)
  );
  // wait for websocket client to connect to subscription server
  await wait(10);

  return {
    port: RANDOM_WS_PORT,
    app,
    wsLink,
    httpServer,
    server,
    apolloClient,
    pubSub,
  };
};
