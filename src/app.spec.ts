import request from 'supertest'
import app from './app.ts'
import conf from './conf.ts'

describe('GET /', () => {
  it('returns 404 with a valid x-api-key', () => {
    // prettier-ignore
    return request(app)
      .get('/')
      .set({
        'Origin': conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(404)
  })
})

describe('GET /api', () => {
  it('returns 404 with a valid x-api-key', () => {
    // prettier-ignore
    return request(app)
      .get('/api')
      .set({
        'Origin': conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(404)
  })
})

describe('GET /api/v1', () => {
  it('returns 404 with a valid x-api-key', () => {
    // prettier-ignore
    return request(app)
      .get('/api/v1')
      .set({
        'Origin': conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(404)
  })
})

describe('GET /api/v1/hello', () => {
  it('returns 400 without x-api-key', () => {
    // prettier-ignore
    return request(app)
      .get('/api/v1/hello')
      .set({
        'Origin': conf.app.origin,
        // 'X-API-Key': 'foobar',
      })
      .expect(400)
  })
  it('returns 401 with a bad x-api-key', () => {
    // prettier-ignore
    return request(app)
      .get('/api/v1/hello')
      .set({
        'Origin': conf.app.origin,
        'X-API-Key': 'foobar',
      })
      .expect(401)
  })
  it('returns 200 with a valid x-api-key', () => {
    // prettier-ignore
    return request(app)
      .get('/api/v1/hello')
      .set({
        'Origin': conf.app.origin,
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(200)
  })
})
