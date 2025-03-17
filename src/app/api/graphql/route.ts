import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "../../../graphql/typeDefs";
import { resolvers } from "../../../graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer);

export const GET = handler;
export const POST = handler;
