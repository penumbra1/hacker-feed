function newVoteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload
};

// Subscribe to updates on a link with the provided linkId
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

// Subscribe to created and deleted links filtered by provided arguments
function newLinkSubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .link({
      mutation_in: ["CREATED"],
      node: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
};

function deletedLinkSubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .link({
      mutation_in: ["DELETED"],
      node: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .previousValues();
}

const deletedLink = {
  subscribe: deletedLinkSubscribe,
  resolve: payload => payload
};

module.exports = {
  newLink,
  deletedLink,
  updatedLink,
  newVote
};
