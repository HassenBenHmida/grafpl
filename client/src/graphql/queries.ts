import { gql } from '@apollo/client';

export const GET_PLAYER = gql`
  query ($name: String!) {
    player(name: $name) {
      code
      first_name
      second_name
      id
      goals_scored
    }
  }
`;
