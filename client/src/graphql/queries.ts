import { gql } from '@apollo/client';

export const GET_PLAYERS_NAMES = gql`
  query ($limit: Int, $filter: String) {
    players(limit: $limit, filter: $filter) {
      web_name
    }
  }
`;

export const GET_PLAYER = gql`
  query ($name: String!) {
    player(name: $name) {
      code
      first_name
      second_name
      id
      goals_scored
      assists
    }
  }
`;
