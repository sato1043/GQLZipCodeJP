#!/usr/bin/env node

import http from 'http'
import https from 'https'
import fs from 'fs'
import { createTerminus } from '@godaddy/terminus'
import pick from 'lodash/pick.js'

import app from './app.ts'
import conf from './conf.ts'
import process from 'process'
import { inspect } from './utils/debug.util.js'

// prettier-ignore
const httpServer = !conf.app.listenOnHttps
  ? http.createServer(app)
  : https.createServer({
    key: fs.readFileSync(conf.app.certKey),
    cert: fs.readFileSync(conf.app.certCrt),
    requestCert: false,
    rejectUnauthorized: false,
  }, app)

createTerminus(
  httpServer,
  Object.freeze({
    logger: console.info,
    healthChecks: { [conf.app.healthCheckEndPointPath]: onHealthCheck },
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP'],
    timeout: conf.app.gracefulShutdownTimeoutSec * 1000,
    onShutdown,
  }),
)

console.time('server set up in')

// prettier-ignore
httpServer
  .listen(conf.app.port, conf.app.host)
  .on('error', onError)
  .on('listening', onListening)

// ===

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${conf.app.port} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`Port ${conf.app.port} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  console.info(`listening on ${conf.app.origin} in NODE_ENV='${conf.env}'`)
  console.timeEnd('server set up in')
  if (conf.isDevelopment) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const listEndpoints = await import('express-list-endpoints')
      inspect(listEndpoints.default(app).map((_) => pick(_, 'methods', 'path')))
    })()
  }
}

async function onShutdown() {
  console.info('server is starting cleanup')
  // ...
  // here my cleanup code
  // ...
  console.info('cleanup finished, shutting down')
  return Promise.resolve()
}

async function onHealthCheck() {
  return Promise.resolve('UP')
}
