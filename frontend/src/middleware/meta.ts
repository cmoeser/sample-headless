// GraphQL
import gql from 'graphql-tag'
import graphqlClient from '../apollo/clients/default'
import { ApolloQueryResult } from 'apollo-client';

/**
 *  @desc Meta middleware. 
 *  Before entering a route fetch the metatags for the associated page and commit to appState pageMeta
 *
 *  @author Chip Moeser 
 *
 *  Fri Aug 2 13:10:49 EDT 2019
 */
export default ({ store, route }) => {
  const func = async (nodeAlias: string) => {
    const response: ApolloQueryResult<any> = await graphqlClient.query({
      query: gql`
        query pageGqlView($field_alias_value: String!) {
          pageGqlView(contextualFilter: { field_alias_value: $field_alias_value }) {
            results {
              entityMetatags {
                key
                value
              }
            }
          }
        }
      `,
      variables: { field_alias_value: nodeAlias }
    })
    //store.commit('appState/SET_PAGE_META', response.data.pageGqlView.results[0], { module: 'appState' })
    // console.log(response.data.pageGqlView.results[0])
  }
  return func(route.path)
}
