const { https } = require('firebase-functions')
const gqlServer = require('./graphql-server.js')

const server = gqlServer()

// Graphql api
const gqlapollo = https.onRequest(server)

// export {api};

module.exports = gqlapollo
