import request from 'supertest';
import app from './app';

describe("GET /", () => {
  it("return 200 and correct message", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});
