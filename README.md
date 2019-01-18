[How to GraphQL](https://www.howtographql.com/react-apollo/) front-end tutorial project.

Final code can be found [here](https://github.com/howtographql/react-apollo), but I'm planning quite a few changes.

# Roadmap

1. Move secrets to .env ✔️
2. Experiment with Tachyons, clean up the markup ✔️ (WIP)
3. Input validation & autocomplete ✔️
4. Move to Reach Router due to link focus issues on route change (see [issue](https://github.com/ReactTraining/react-router/issues/5210)) ✔️
5. Add auth context to store the name of the current user ✔️
6. Add a [custom directive](https://codeburst.io/use-custom-directives-to-protect-your-graphql-apis-a78cbbe17355) instead of getUserId() in utils.
7. Add mutation states with UI feedback
8. Add a redirect to login and back for unauth-d users on /create ✔️
9. 404 page ✔️
10. Error in signup if email is already registered
11. Switch from graphql-yoga to apollo-server (see [discussion](https://github.com/prisma/graphql-yoga/issues/449))
12. Add comments and user dashboard with posts
13. Add moderator role: bans users, hides inappropriate posts (see [article](https://blog.apollographql.com/authorization-in-graphql-452b1c402a9))
14. TS?
15. Expire the token, add a query to check if it's valid on app startup.

# Notes

### Context

**NB**: storing context in the same file as components can lead to a circular dependency (see [issue](https://github.com/facebook/react/issues/13969)), e.g. if I place AuthContext in App.js and import it in Header.js, which is itself imported in App.js.

### JSON Web Tokens

This is pretty controversial:
[Why JWTs Suck as Session Tokens](https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens)
[Discussion of Please Stop Using Local Storage](https://dev.to/rdegges/please-stop-using-local-storage-1i04/comments). I'm sticking with JWT for now as I'm only storing a userID and there is no other sensitive data involved in the app. I'll also enable token expiry.

### Routing

Reach Router [can't navigate back](https://github.com/reach/router/issues/44) yet, I'm using window.history.back().

### Sorting

I wish there were a performant way to order links by number of votes on the server. Sorting by length of related fields is [not implemented](https://stackoverflow.com/questions/53625619/query-to-get-data-ordered-by-the-number-of-items-in-a-relation) in Prisma yet. Counting votes for each link and sorting them on the client would break pagination and affect performance. For now, I'm sticking to sorting by scalar fields.
