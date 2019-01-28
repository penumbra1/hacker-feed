const dotenv = require("dotenv");

dotenv.load();

const { GraphQLServer } = require("graphql-yoga");
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const { getUser } = require("./utils");
const { directiveResolvers } = require("./directiveResolvers");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const schema = makeExecutableSchema({
  typeDefs: importSchema("./src/schema.graphql"),
  resolvers,
  directiveResolvers
});

const server = new GraphQLServer({
  schema,
  context: req => ({
    ...req,
    ...getUser(req),
    prisma
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
