const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../utils");

async function post(parent, args, context, info) {
  return context.prisma.createLink(
    {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: context.userId } }
    },
    info
  );
}

async function remove(parent, args, context, info) {
  // Getting ownerId via $fragment
  // due to https://github.com/prisma/prisma/issues/3919
  const { id: ownerId } = await context.prisma
    .link({
      id: args.linkId
    })
    .postedBy().$fragment(`
      fragment Id on User {
        id
      }
    `);

  if (ownerId !== context.userId) {
    throw new Error("Link was posted by another user");
  }

  return context.prisma.deleteLink({ id: args.linkId }, info);
}

async function signup(parent, args, context) {
  const registered = await context.prisma.$exists.user({ email: args.email });
  if (registered) {
    throw new Error("Email is already registered");
  }

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  };
}

async function vote(parent, args, context, info) {
  const voteExists = await context.prisma.$exists.vote({
    user: { id: context.userId },
    link: { id: args.linkId }
  });
  if (voteExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const votedLink = await context.prisma.updateLink(
    {
      where: {
        id: args.linkId
      },
      data: {
        votes: {
          create: [
            {
              user: {
                connect: {
                  id: context.userId
                }
              }
            }
          ]
        }
      }
    },
    info
  );

  return votedLink;
}

async function unvote(parent, args, context, info) {
  // Unlike "vote", "votes" query uses VoteWhereInput and doesn't require a vote ID
  const votesByUser = await context.prisma.votes({
    where: {
      link: { id: args.linkId },
      user: { id: context.userId }
    }
  });
  if (!votesByUser[0]) {
    throw new Error(`User hasn't voted for this link yet: ${args.linkId}`);
  }

  const unvotedLink = await context.prisma.updateLink(
    {
      where: {
        id: args.linkId
      },
      data: {
        votes: {
          delete: {
            id: votesByUser[0].id
          }
        }
      }
    },
    info
  );

  return unvotedLink;
}

module.exports = {
  post,
  remove,
  signup,
  login,
  vote,
  unvote
};
