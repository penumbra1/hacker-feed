const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function post(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

async function signup(parent, args, context) {
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

async function vote(parent, args, context) {
  const userId = getUserId(context);
  const voteExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (voteExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const votedLink = await context.prisma.updateLink({
    where: {
      id: args.linkId
    },
    data: {
      votes: {
        create: [
          {
            user: {
              connect: {
                id: userId
              }
            }
          }
        ]
      }
    }
  });

  return votedLink;
}

async function unvote(parent, args, context) {
  const userId = getUserId(context);
  // Unlike "vote", "votes" query uses VoteWhereInput and doesn't require a vote ID
  const votesByUser = await context.prisma.votes({
    where: {
      link: { id: args.linkId },
      user: { id: userId }
    }
  });
  if (!votesByUser[0]) {
    throw new Error(`User hasn't voted for this link yet: ${args.linkId}`);
  }

  const unvotedLink = await context.prisma.updateLink({
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
  });

  return unvotedLink;
}

module.exports = {
  post,
  signup,
  login,
  vote,
  unvote
};
