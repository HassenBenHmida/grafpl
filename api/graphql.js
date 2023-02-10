import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import resolvers from './resolvers';
import { types } from './schema';

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
