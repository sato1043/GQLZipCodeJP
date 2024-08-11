#!/usr/bin/env node

import http from 'http';
import https from 'https';
import fs from 'fs';
import debug from './utils/debug';
import app from './app';

const host = process.env.HOST || 'localhost';
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const certKey = `scripts/crt@${host}/${host}.key`;
const certCrt = `scripts/crt@${host}/${host}.crt`;
const hasCertificates = fs.existsSync(certKey) && fs.existsSync(certCrt);
if (!hasCertificates) {
  console.error(`certifications not found`);
}
const server = !hasCertificates
  ? http.createServer(app)
  : https.createServer({
    key: fs.readFileSync(certKey),
    cert: fs.readFileSync(certCrt),
    requestCert: false,
    rejectUnauthorized: false,
  }, app);
server.listen(port, host);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val: string) {
  const port = parseInt(val, 10);
  return !Number.isNaN(port) && 0 <= port ? port : undefined;
}

// Event listener for HTTP server "error" event.
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

// event listener for HTTP server "listening" event.
function onListening() {
  debug(`listening on http${hasCertificates ? 's':''}://${host}:${port}`);
}
