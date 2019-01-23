[How to GraphQL](https://www.howtographql.com/react-apollo/) front-end tutorial project.

Final code can be found [here](https://github.com/howtographql/react-apollo), but I'm planning quite a few changes.

# Roadmap

1. Move secrets to .env ✔️
2. Experiment with Tachyons, clean up the markup ✔️ (WIP)
3. Input validation & autocomplete ✔️
4. Move to Reach Router due to link focus issues on route change (see [issue](https://github.com/ReactTraining/react-router/issues/5210)) ✔️
5. Add a query and client context for current user ✔️
6. Add a [custom directive](https://codeburst.io/use-custom-directives-to-protect-your-graphql-apis-a78cbbe17355) to protect posts and votes.
7. Add mutation states with UI feedback
8. Add a redirect to login and back for unauth-d users on /create ✔️
9. 404 page ✔️
10. Cancelling upvotes with optimistic updates ✔️
11. Automatic cache updates ✔️
12. [Debounce](https://www.npmjs.com/package/apollo-link-debounce) upvotes ✔️
13. Count upvotes by current user on the server via an aggregate query
14. Error in signup if email is already registered
15. Fetching loader
16. Switch from graphql-yoga to apollo-server (see [discussion](https://github.com/prisma/graphql-yoga/issues/449))
17. Add user post stats to the account page
18. Add moderator role: bans users, hides posts (see [article](https://blog.apollographql.com/authorization-in-graphql-452b1c402a9))
19. TS?
20. Expire the token, add a query to check if it's valid on app startup.

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

### Mutations & cache

To make use of [automatic updates](https://www.apollographql.com/docs/react/advanced/caching.html#automatic-updates) in Apollo, I rewrote voting mutations so that they return the updated links instead of votes. As the UI is mapped to links from the GET_FEED query, Apollo is able to figure out when the links have updated and rerender automatically without any update function 🔥

**NB:** Prisma doesn't return related data after a mutation (e.g. deleting a vote returns the vote id but not the link it belonged to). See issues: [1](https://github.com/prisma/graphcool-framework/issues/519), [2](https://github.com/prisma/prisma/issues/2347).

### Queries & subscriptions

By taking advantage of argument nullability, I was able to reuse the same feed query both on the homepage and in /search.

Subscriptions also work in the /search route and obey the filters specified as nullable arguments.
