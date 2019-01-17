const { getUserId } = require("../utils");

async function feed(parent, args, context) {
  const count = await context.prisma
    .linksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .aggregate()
    .count();
  const links = await context.prisma.links({
    where: {
      OR: [{ description_contains: args.filter }, { url_contains: args.filter }]
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
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
