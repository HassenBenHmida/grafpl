import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_PLAYERS_NAMES, GET_TEAM, GET_TEAM_PICKS } from './queries';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
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
