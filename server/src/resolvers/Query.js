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
  const { userId } = context;

  if (!userId) return null;

  return context.prisma.user({
    id: userId
  });
}

module.exports = {
  feed,
  currentUser
};
