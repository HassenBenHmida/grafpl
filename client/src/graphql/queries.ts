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

export const GET_TEAM = gql`
  query ($entry: ID!) {
    entry(id: $entry) {
      name
      summary_overall_rank
      summary_overall_points
    }
  }
`;

export const GET_TEAM_PICKS = gql`
  query ($entry: Int!, $event: Int!) {
    picks(entry: $entry, event: $event) {
      active_chip
      entry_history {
        points
        total_points
        overall_rank
      }
      picks {
        position
        is_captain
        player {
          id
          web_name
          event_points
          element_type
        }
      }
    }
  }
`;

export const GET_PLAYER_LIVE_STATS = gql`
  query ($player: ID!, $event: Int!) {
    live(id: $player, event: $event) {
      player {
        web_name
      }
      stats {
        total_points
      }
    }
  }
`;
