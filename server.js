const express = require('express');
const session = require('express-session');
// const passport = require('./config/passport');
// const routes = require('./routes');
const sequelize = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'just-tech-news-dev',
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(passport.initialize());
// app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// app.use(routes);

app.get('/', (req, res) => {
  res.sendFile('client/build/index.html');
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`Now listening on PORT: ${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
