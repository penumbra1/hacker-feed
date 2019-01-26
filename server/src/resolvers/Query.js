const { getUserId } = require("../utils");

async function feed(parent, args, context, info) {
  // Getting count via $fragment
  // due to https://github.com/prisma/prisma/issues/3919
  const { count } = await context.prisma
    .linksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .aggregate().$fragment(`
      fragment Count on AggregateLink {
        count
      }
    `);

  const links = await context.prisma.links(
    {
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy
    },
    info
  );
  return {
    count,
    links
  };
}

async function currentUser(parent, args, context) {
  let userId;
  try {
    userId = getUserId(context);
  } catch (e) {
    return null; // not authenticated - invalid token
  }

  const user = await context.prisma.user({
    id: userId
  });
  if (!user) {
    return null; // valid token, but no such user in DB
  }

  return user;
}

module.exports = {
  feed,
  currentUser
};
