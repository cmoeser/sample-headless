const { GraphQLDataSource } = require('apollo-datasource-graphql')
const { gql } = require('apollo-server-express')

const META_TAGS = gql`
  query pageGqlView($field_alias_value: String!) {
    pageGqlView(contextualFilter: { field_alias_value: $field_alias_value }) {
      results {
        entityMetatags {
          key
          value
        }
      }
    }
  },
`

module.exports = class MetaTagsGraphQLAPI extends GraphQLDataSource {
  constructor() {
    super()
    this.baseURL = 'https://dev-sample-headless-backend.pantheonsite.io/graphql'
  }

  async getMetaTags(contextualFilter = "/services") {
    
    try {
      const response = await this.query(META_TAGS, { variables: { "field_alias_value": contextualFilter } })
      console.log('Called GQL: ', contextualFilter, ' : ' )
      //response.data.pageGqlView.results[0].entityMetatags
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
