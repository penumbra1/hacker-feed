[How to GraphQL](https://www.howtographql.com/react-apollo/) front-end tutorial project.

Final code can be found [here](https://github.com/howtographql/react-apollo), but I'm planning quite a few changes.

# Roadmap

1. Move secrets to .env ✔️
2. Experiment with Tachyons, clean up the markup ✔️ (WIP)
3. Input validation & autocomplete ✔️
4. Move to Reach Router due to link focus issues on route change (see [issue](https://github.com/ReactTraining/react-router/issues/5210)) ✔️
5. Add auth context to store a Boolean for whether the user is logged in ✔️
6. Add a [custom directive](https://codeburst.io/use-custom-directives-to-protect-your-graphql-apis-a78cbbe17355) instead of getUserId() in utils.
7. Pagination ([docs](https://www.apollographql.com/docs/react/features/pagination.html))
8. Add mutation states with UI feedback
9. Add a redirect to login and back for unauth-d users on /create (see Fullstack React p.439)
10. Switch from graphql-yoga to apollo-server (see [discussion](https://github.com/prisma/graphql-yoga/issues/449))
11. Add comments and user dashboard with posts
12. Add moderator role: bans users, hides inappropriate posts
13. TS?
14. Expire the token, add a query to check if it's valid on app startup.

# Notes

**NB**: storing context in the same file as components can lead to a circular dependency (see [issue](https://github.com/facebook/react/issues/13969)), e.g. if I place AuthContext in App.js and import it in Header.js, which is itself imported in App.js.

### JSON Web Tokens

This is pretty controversial:
[Why JWTs Suck as Session Tokens](https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens)
[Discussion of Please Stop Using Local Storage](https://dev.to/rdegges/please-stop-using-local-storage-1i04/comments). I'm sticking with JWT for now as I'm only storing a userID and there is no other sensitive data involved in the app. I'll also enable token expiry.
