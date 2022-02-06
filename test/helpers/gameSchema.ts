import { gql } from "@apollo/client";

export default gql`
  extend type Subscription {
    game(id: String): Game
  }

  extend type Mutation {
    keyPress(gameId: String!, key: String!): Game
  }

  type Game {
    key: String
  }
`;
