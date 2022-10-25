import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_PLAYERS_NAMES } from './queries';

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
    return data.players.map((player) => ({
      label: player.web_name,
      value: player.web_name,
    }));
  }
  return [];
};
