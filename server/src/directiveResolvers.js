const directiveResolvers = {
  isAuthenticated: (next, source, args, context) => {
    const { userId, token } = context;
    if (!userId || !token) throw new Error("Not authenticated");
    return next();
  }
};

module.exports = {
  directiveResolvers
};
