// const { GraphQLServer } = require("graphql-yoga");
// const resolvers = require("./resolvers");

// const server = new GraphQLServer({
//   typeDefs: "src/schema.graphql",
//   resolvers
// });

// server.start(() =>
//   console.log(`The server is running on http://localhost:4000`)
// );

const path = require("path");
const fs = require("fs");
const { createServer } = require("node:http");
const { createYoga, createSchema } = require("graphql-yoga");
const resolvers = require("./resolvers");

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
  }),
});

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
