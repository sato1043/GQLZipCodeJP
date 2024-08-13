#!/usr/bin/env node

import http from 'http';
import https from 'https';
import fs from 'fs';
import { createTerminus } from '@godaddy/terminus';
import pick from 'lodash/pick.js';

import app from './app.ts';
import conf from './conf.ts'
import util from 'util';
import process from 'process';

const { host , port } = conf.app;
const certKey = `scripts/crt@${host}/${host}.key`;
const certCrt = `scripts/crt@${host}/${host}.crt`;
const hasCertificates = fs.existsSync(certKey) && fs.existsSync(certCrt);
if (conf.app.listenOnHttps && !hasCertificates) {
  console.error(`cert not found`);
  process.exit(1);
}

app.set('port', port);

const httpServer = !conf.app.listenOnHttps
  ? http.createServer(app)
  : https.createServer({
    key: fs.readFileSync(certKey),
    cert: fs.readFileSync(certCrt),
    requestCert: false,
    rejectUnauthorized: false,
  }, app);

createTerminus(
  httpServer,
  Object.freeze({
    logger: console.info,
    // eslint-disable-next-line @typescript-eslint/require-await
    healthChecks: { [conf.app.healthCheckEndPointPath]: async () => 'UP' },
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP'],
    timeout: conf.app.gracefulShutdownTimeoutSec * 1000,
    onShutdown,
  }),
);

httpServer
  .listen(port, host)
  .on('error', onError)
  .on('listening', onListening);

// ===

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const proto = conf.app.listenOnHttps ? 'https' : 'http';
  console.info(`listening on ${proto}://${host}:${port} in NODE_ENV='${conf.env}'`);
  if (conf.isDevelopment) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const listEndpoints = await import('express-list-endpoints');
      console.log(
        util.inspect(
          listEndpoints.default(app).map((_) => pick(_, 'methods', 'path')),
          { showHidden: false, depth: null, colors: true },
        ),
      );
      console.log(
        util.inspect(conf.apikey.codeList,
          { showHidden: false, depth: null, colors: true }),
      );
    })();
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
async function onShutdown() {
  console.info('server is starting cleanup');
  // ...
  // here my cleanup code
  // ...
  console.info('cleanup finished, shutting down');
}
