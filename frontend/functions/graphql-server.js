const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema.js')
const resolvers = require('./resolvers.js')
const MetaTagsGraphQLAPI = require('./metatags.js')

const gqlServer = () => {
  const app = express()

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources: () => {
      return {
        MetaTagsGraphQLAPI: new MetaTagsGraphQLAPI()
      }
    },
    // Enable graphiql gui
    introspection: true,
    playground: true
  })

  apolloServer.applyMiddleware({ app, path: '/', cors: false })

  return app
}

module.exports = gqlServer
