import React from "react";
import { ApolloConsumer } from "@apollo/client";

export const apolloClientProvider = (WrappedComponent: any) => {
  return (props: any) => (
    <ApolloConsumer>
      {(client) => {
        return <WrappedComponent client={client} {...props} />;
      }}
    </ApolloConsumer>
  );
};
