import request from 'supertest'

import app from './app.ts'
import conf from './conf.ts'

describe('GET /', () => {
  it('returns 404 with a valid x-api-key', () => {
    return request(app)
      .get('/')
      .set({
        Origin: conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(404)
  })
})

describe('GET /api', () => {
  it('returns 404 with a valid x-api-key', () => {
    return request(app)
      .get('/api')
      .set({
        Origin: conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(404)
  })
})

describe('GET /api/v1', () => {
  it('returns 404 with a valid x-api-key', () => {
    return request(app)
      .get('/api/v1')
      .set({
        Origin: conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(404)
  })
})
