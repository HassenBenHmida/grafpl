import path, { dirname } from "path";
import * as fs from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers.js";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  introspection: true,
  cors: {
    origin: "*",
    credentials: true,
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
