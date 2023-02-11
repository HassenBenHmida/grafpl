import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import resolvers from '../src/graphql/resolvers';
import { types } from '../src/graphql/schema';

// const __dirname = dirname(fileURLToPath(import.meta.url));
const server = new ApolloServer({
  typeDefs: types,
  resolvers,
  introspection: true,
  cors: {
    origin: '*',
    credentials: true,
  },
});

// async () => {
//   const { url } = await startStandaloneServer(server);
//   console.log(`🚀  Server ready at: ${url}`);
// };

export default startStandaloneServer(server);
