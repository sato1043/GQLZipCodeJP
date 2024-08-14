/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import process from 'process'
import { inspect } from './utils/debug.util.ts'

Error.stackTraceLimit = Number(process.env.ERROR_STACK_LEN || 4)

// prettier-ignore
if (
  !(process.env.NODE_ENV === 'production'
    || process.env.NODE_ENV === 'test'
    || process.env.NODE_ENV === 'development')
  || !process.env.APIKEY_PASSPHRASE // APIKEY_*はkeytoolも利用中
  || !process.env.APIKEY_SALT
) {
  throw new Error('miss configured')
}

// ==========

const production = {
  logFormat: 'combined', // 'combined' | 'common' | 'dev' | 'short'| 'tiny'
}

// ==========

const development = {
  logFormat: 'dev',
}

// ==========

const test = {
  logFormat: 'short',
}

// ==========

const conf = {
  env: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',

  app: {
    listenOnHttps: process.env.LISTEN_ON_HTTPS === 'true',
    proto: process.env.LISTEN_ON_HTTPS === 'true' ? 'https' : 'http',
    host: process.env.HOST || 'localhost',
    port: normalizePort(process.env.PORT) ?? 3000,
    origin: '',
    healthCheckEndPointPath: process.env.HEALTHCHECK_ENDPOINT_PATH || '/health',
    gracefulShutdownTimeoutSec: Number(process.env.GRACEFUL_SHUTDOWN_TIMEOUT_SEC || 10),
    allowOrigins: JSON.parse(process.env.ALLOW_ORIGINS || '[]') as string[],
    allowAllServers: process.env.ALLOW_ALL_SERVERS === 'true',
  },

  apikey: {
    passPhrase: process.env.APIKEY_PASSPHRASE || '',
    salt: process.env.APIKEY_SALT || '',
    codeList: JSON.parse(process.env.APIKEY_CODELIST || '[]') as string[],
  },

  // prettier-ignore
  ...(process.env.NODE_ENV === 'production' ? production
    : process.env.NODE_ENV === 'test' ? test
      : development),
}

conf.app.origin = `${conf.app.proto}://${conf.app.host}:${conf.app.port}`
conf.app.allowOrigins.push(conf.app.origin)

if (conf.isDevelopment || conf.isTest) {
  inspect(conf, 'Current Environment:')
}

export default conf

function normalizePort(val: string | undefined) {
  if (val === undefined) return undefined
  const port = parseInt(val, 10)
  return !Number.isNaN(port) && 0 <= port ? port : undefined
}
