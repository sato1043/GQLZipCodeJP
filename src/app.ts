import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import conf from './conf.ts'
import { decrypt } from './utils/crypto.util.ts'
import { __dirname } from './utils/file.util.ts'
import indexRouter from './routes/index.ts'
import { Error400, Error401, Error404, extractStringFrom } from './utils/express.util.ts'

const app = express()

app.disable('x-powered-by')
app.use(logger(conf.logFormat))
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  const apikey = extractStringFrom(req.headers?.['x-api-key'])
  if (!apikey) {
    throw Error400
  }
  try {
    if (!conf.apikey.codeList.includes(decrypt(conf.apikey.passPhrase, conf.apikey.salt, apikey))) {
      throw Error401
    }
  } catch {
    throw Error401
  }
  next()
})

app.get('/', () => { throw Error404 }) // prettier-ignore
app.get('/api', () => { throw Error404 }) // prettier-ignore
app.get('/api/v1', () => { throw Error404 }) // prettier-ignore
app.use('/api/v1/hello', indexRouter)

export default app
