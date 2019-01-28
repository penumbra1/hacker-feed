const jwt = require("jsonwebtoken");

const { APP_SECRET } = process.env;

function getUser(req) {
  let userId;
  let token;
  if (req.request) {
    // Query/Mutation over http with an Authorization header
    const authHeader = req.request.get("Authorization");
    token = authHeader && authHeader.replace("Bearer ", "");
  } else {
    // Subscription over ws
    token = req.connection.context.authToken;
  }
  if (token) {
    try {
      ({ userId } = jwt.verify(token, APP_SECRET));
    } catch (e) {
      console.error(e); // JWT error, go on with undefined token and userId
    }
  }
  return { token, userId };
}

module.exports = {
  APP_SECRET,
  getUser
};
