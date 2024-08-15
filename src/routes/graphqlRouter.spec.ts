import request from 'supertest'

import app from '../app.ts'

describe('GET /api/v1/graphql', () => {
  it('returns 400 without origin', () => {
    return request(app)
      .get('/api/v1/graphql')
      .set({
        // 'Origin': 'https://localhost:9000',
        // 'X-API-Key': 'foobar',
      })
      .expect(400)
  })
  it('returns 401 with unexpected origin', () => {
    return request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9999',
        // 'X-API-Key': 'foobar',
      })
      .expect(401)
  })
  it('returns 400 without x-api-key', () => {
    return request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9000',
        // 'X-API-Key': 'foobar',
      })
      .expect(400)
  })
  it('returns 401 with a bad x-api-key', () => {
    return request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9000',
        'X-API-Key': 'foobar',
      })
      .expect(401)
  })
  it('returns 200 with a valid x-api-key', () => {
    return request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9000',
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(200)
  })
})
