const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
// const gqlapollo = require('./graphql-apollo.js')

const app = express()

const config = {
  dev: false,
  buildDir: 'nuxt',
  devTools: true,
  build: {
    publicPath: '/assets/'
  }
}
const nuxt = new Nuxt(config)

// Is ready promise to prevent cold start errors
let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

const handleRequest = async (req, res) => {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  await nuxt.render(req, res)
}

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

app.use(handleRequest)

module.exports = {
  ssr: functions.runWith(runtimeOpts).https.onRequest(app),
  // gqlapollo: functions.runWith(runtimeOpts).https.onRequest(gqlapollo)
}
// exports.ssr = functions.runWith(runtimeOpts).https.onRequest(app)