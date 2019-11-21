import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

/**
 * fragmentMatcher
 * @description - Entity fields such as panels can have multiple value types. This fixes "hueristic fragment errors"
 */
const fragmentMatcher: IntrospectionFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'entity',
          possibleTypes: [{ name: 'ParagraphClientLogosPanel' }, { name: 'ParagraphSimplePanel' }]
        }
      ]
    }
  }
})

/**
 *  ApolloClient
 *  Creates a new client for Appolo with the Drupal endpoint.
 *
 *  @author Chip Moeser 
 *
 *  Wed Sep 4 16:00:11 EDT 2019
 */
export default new ApolloClient({
  // Using a cache for blazingly fast subsequent queries.
  cache: new InMemoryCache({
    fragmentMatcher
  }),
  // Provide the URL to the API server.
  link: createHttpLink({
    uri: 'https://dev-sample-headless-backend.pantheonsite.io/graphql/',
    fetch
  })
})
