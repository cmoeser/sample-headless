const resolvers = {
  Query: {
    getMetaTags: async (_source, { contextualFilter }, { dataSources }) => dataSources.MetaTagsGraphQLAPI.getMetaTags(contextualFilter)
  }
}

module.exports = resolvers
