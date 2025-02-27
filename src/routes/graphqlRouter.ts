import { renderGraphiQL } from '@graphql-yoga/render-graphiql'
import express from 'express'
import { createSchema, createYoga } from 'graphql-yoga'
import helmet from 'helmet'

import { context } from '../schema/contexts.ts'
import type { IncomingRequestContext } from '../schema/contexts.ts'
import { resolvers } from '../schema/resolvers.generated.ts'
import { typeDefs } from '../schema/typeDefs.generated.ts'
import { wrapPromisedRequestHandler } from '../utils/express.util.ts'
import conf from './../conf.ts'

// biome-ignore  lint/complexity/noBannedTypes: TServerContextを明示的初期化する定数が見つからない/使わないため
export const yoga = createYoga<{}, IncomingRequestContext>({
  landingPage: false,
  schema: createSchema<IncomingRequestContext>({ typeDefs, resolvers }),
  graphqlEndpoint: conf.endpoint.graphql,
  ...(!conf.isDevelopment
    ? undefined
    : {
        graphiql: true, // (viewer) https://the-guild.dev/graphql/yoga-server/docs/features/graphiql
        renderGraphiQL: renderGraphiQL,
      }),
  context,
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
