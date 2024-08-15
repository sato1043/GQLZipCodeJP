import express from 'express'
import helmet from 'helmet'
import { createYoga } from 'graphql-yoga'
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'

import conf from './../conf.ts'
import { wrapPromisedRequestHandler } from '../utils/express.util.ts'

export const yoga = createYoga({
  landingPage: false,
  graphqlEndpoint: '/api/v1/graphql',
  ...(!conf.isDevelopment
    ? undefined
    : {
        graphiql: true, // (viewer) https://the-guild.dev/graphql/yoga-server/docs/features/graphiql
        renderGraphiQL: renderGraphiQL,
      }),
})

const graphqlRouter = express.Router()

if (conf.isDevelopment) {
  // GraphiQL (not graphQL) specific CSP
  graphqlRouter.use(
    helmet({
      originAgentCluster: false,
      contentSecurityPolicy: {
        directives: {
          'style-src': ["'self'", "'unsafe-inline'"],
          'script-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:'],
        },
      },
    }),
  )
}

// an Upload scalar to add support for GraphQL multipart requests
// make sure there is no other middleware which parses multipart/form-data HTTP requests before it
// graphqlRouter.use(graphqlUploadExpress());

graphqlRouter.use(
  '/',
  wrapPromisedRequestHandler((req, res) => yoga(req, res)),
)

export default graphqlRouter
