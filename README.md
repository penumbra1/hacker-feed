[How to GraphQL](https://www.howtographql.com/react-apollo/) front-end tutorial project.

Final code can be found [here](https://github.com/howtographql/react-apollo), but I'm planning a few changes:

1. Move secrets to .env ✔️
2. Experiment with Tachyons, clean up the markup ✔️ (WIP)
3. Input validation styles
4. Add a [custom directive](https://codeburst.io/use-custom-directives-to-protect-your-graphql-apis-a78cbbe17355) instead of getUserId() in utils.
5. Add mutation states with UI feedback
6. Add a redirect to login and back for unauth-d users on /create (see Fullstack React p.439)
7. Switch from graphql-yoga to apollo-server (see [discussion](https://github.com/prisma/graphql-yoga/issues/449))
8. Add comments and user dashboard with posts
9. Add moderator role: bans users, hides inappropriate posts
10. Rewrite in TS?
11. Avoid storing JWT in localstorage (store it in a cookie or use a session cookie directly - see [Why JWTs Suck as Session Tokens](https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens))
