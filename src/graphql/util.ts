import { ApolloClient, InMemoryCache } from '@apollo/client';

import {
  GET_OVERALL_POINTS_BY_FIXTURE,
  GET_PLAYED_FIXTURES,
  GET_PLAYER,
  GET_PLAYER_LIVE_STATS,
  GET_PLAYERS_NAMES,
  GET_TEAM,
  GET_TEAM_PICKS,
} from './queries';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export const getOptions = async (input: string) => {
  if (input && input.trim().length < 3) {
    return [];
  }
  const { data } = await client.query({
    query: GET_PLAYERS_NAMES,
    variables: { limit: 15, filter: input },
  });
  if (data && data.players) {
    return data.players.map((player: { web_name: string }) => ({
      label: player.web_name,
      value: player.web_name,
    }));
  }
  return [];
};

export const getTeamByID = async (id: string) => {
  try {
    const { data } = await client.query({
      query: GET_TEAM,
      variables: { entry: id },
    });
    return data.entry;
  } catch (error) {
    return error;
  }
};

export const getPicksByFixture = async (id: string, fixture: string) => {
  try {
    const { data } = await client.query({
      query: GET_TEAM_PICKS,
      variables: { entry: parseInt(id), event: parseInt(fixture) },
    });
    return data.picks;
  } catch (error) {
    return error;
  }
};

export const getPlayerLivePoints = async (id: number, fixture: number) => {
  try {
    const { data } = await client.query({
      query: GET_PLAYER_LIVE_STATS,
      variables: { player: id, event: fixture },
    });
    return data.live;
  } catch (error) {
    return error;
  }
};

export const getLastGameweek = async () => {
  try {
    const { data } = await client.query({
      query: GET_PLAYED_FIXTURES,
    });
    return data.events.at(-1).id;
  } catch (error) {
    return error;
  }
};

export const getPlayerDetails = async (id: number) => {
  const { data } = await client.query({
    query: GET_PLAYER,
    variables: { id: id },
  });
  return data.player;
};

export const getOverallPoints = async (teamID: string, fixture: string) => {
  const { data } = await client.query({
    query: GET_OVERALL_POINTS_BY_FIXTURE,
    variables: { entry: parseInt(teamID), event: parseInt(fixture) },
  });
  return data.picks;
};

export const getPlayerTotalPoints = async (
  id: number,
  start: string,
  total_points: number,
) => {
  // let total = 0;
  // for (let i = parseInt(start); i <= parseInt(end); i++) {
  //   const player = await getPlayerLivePoints(id, i);
  //   total += player.stats.total_points;
  // }

  if (parseInt(start) > 1) {
    for (let i = 1; i < parseInt(start); i++) {
      const player = await getPlayerLivePoints(id, i);
      total_points -= player.stats.total_points;
    }
  }

  return total_points;
};
