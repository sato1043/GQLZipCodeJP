#!/usr/bin/env node

import http from 'http';
import https from 'https';
import fs from 'fs';
import { createTerminus } from '@godaddy/terminus';
import { pick } from 'lodash';

import app from './app';
import conf from './conf'
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
    console.log(
      util.inspect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        require('express-list-endpoints')(app).map((_: any) => pick(_, 'methods', 'path')),
        { showHidden: false, depth: null, colors: true },
      ),
    );
    console.log(
      util.inspect(conf.apikey.codeList,
        { showHidden: false, depth: null, colors: true }),
    );
  }
}

async function onShutdown() {
  console.info('server is starting cleanup');
  // ...
  // here my cleanup code
  // ...
  console.info('cleanup finished, shutting down');
}
