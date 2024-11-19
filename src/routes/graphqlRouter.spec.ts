import request from 'supertest'

import app from '../app.ts'
import { graphql } from '../client/gql.ts'
import { executeOperation } from '../utils/spec.util.ts'

describe('GET /api/v1/graphql', () => {
  it('returns 400 without origin', async () => {
    await request(app)
      .get('/api/v1/graphql')
      .set({
        // 'Origin': 'https://localhost:9000',
        // 'X-API-Key': 'foobar',
      })
      .expect(400)
  })
  it('returns 401 with unexpected origin', async () => {
    await request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9999',
        // 'X-API-Key': 'foobar',
      })
      .expect(401)
  })
  it('returns 400 without x-api-key', async () => {
    await request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9000',
        // 'X-API-Key': 'foobar',
      })
      .expect(400)
  })
  it('returns 401 with a bad x-api-key', async () => {
    await request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9000',
        'X-API-Key': 'foobar',
      })
      .expect(401)
  })
  it('returns 200 with a valid x-api-key', async () => {
    await request(app)
      .get('/api/v1/graphql')
      .set({
        Origin: 'https://localhost:9000',
        'X-API-Key': process.env.TEST_APIKEY,
      })
      .expect(200)
  })
})

describe('Query townArea', () => {
  it('returns postalCode', async () => {
    const queryTownArea = graphql(`
      query TownArea ($postalCode: PostalCode!) {
        townArea (postalCode: $postalCode) {
          postalCode
          updateDateTime
        }
      }
    `)
    const [result, response] = await executeOperation(queryTownArea, {
      postalCode: '100-0001',
    })

    expect(response.status).toBe(200)
    expect(result.data?.townArea.postalCode).toEqual('1000001')
  })
})
