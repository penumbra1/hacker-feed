function newVoteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
};

function updatedLinkSubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .link({
      mutation_in: ["UPDATED"],
      node: {
        id: args.linkId
      }
    })
    .node();
}

const updatedLink = {
  subscribe: updatedLinkSubscribe,
  resolve: payload => payload
};

async function postedLinkSubscribe(parent, args, context, info) {
  console.log("postedLinkSubscribe");
  return context.prisma.$subscribe
    .link(
      {
        mutation_in: ["CREATED"],
        node: {
          OR: [
            { description_contains: args.filter },
            { url_contains: args.filter }
          ]
        }
      },
      info
    )
    .node();
}

const postedLink = {
  subscribe: postedLinkSubscribe,
  resolve: payload => payload
};

async function removedLinkSubscribe(parent, args, context, info) {
  console.log("removedLinkSubscribe");
  return context.prisma.$subscribe.link(
    {
      mutation_in: ["DELETED"],
      node: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    },
    info
  ).$fragment(`
      fragment PreviousValues on LinkSubscriptionPayload {
        previousValues {
          id
        }
      }
    `);
}

const removedLink = {
  subscribe: removedLinkSubscribe,
  resolve: payload => payload.previousValues
};

module.exports = {
  postedLink,
  removedLink,
  updatedLink,
  newVote
};
