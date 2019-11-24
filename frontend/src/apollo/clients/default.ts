import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

/**
 * @name - fragmentMatcher
 * 
 * @description - Entity fields such as panels can have multiple value types. This fixes "hueristic fragment errors"
 * Simply put multipe paragrph types can come from single query entity point. 
 * GraphQL uses these structures for cachng. We use this to allow for propper mapping of that caching.
 * 
 * @type - IntrospectionFragmentMatcher
 */
const fragmentMatcher: IntrospectionFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'entity',
          possibleTypes: [{ name: 'ParagraphSlideshow' }, { name: 'ParagraphSimplePanel' }]
        }
      ]
    }
  }
})

/**
 *  @name - ApolloClient
 * 
 *  @desc - Creates a new client for Appolo with the Drupal endpoint.
 *
 *  @author - Chip Moeser 
 *
 *  Wed Nov 20 22:24:11 EST 2019
 * 
 */
export default new ApolloClient({
  // Using a cache for fast subsequent queries.
  cache: new InMemoryCache({
    fragmentMatcher
  }),
  // Provide the URL to the API server.
  link: createHttpLink({
    uri: 'https://live-sample-headless-backend.pantheonsite.io/graphql/',
    fetch
  })
})
