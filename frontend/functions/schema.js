const { gql } = require('apollo-server-express')

const schema = gql`
  type Query {
    getMetaTags: PageGqlView @cacheControl(maxAge: 0)
  }

  type KeyValue {
    key: String
    value: String
  }
  type EntityMetatags {
    entityMetatags: [KeyValue]
  }
  type Results {
    results: [EntityMetatags]
  }
  input FieldAlisValue {
    field_alias_value: String
  }
  type PageGqlView {
    pageGqlView(contextualFilter: FieldAlisValue!): Results
  }
`

module.exports = schema
