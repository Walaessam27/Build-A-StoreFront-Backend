// @ts-ignore
const supertest = require('supertest');
import app from '../../server';

const request = supertest(app);

describe('Test Products Endpoints', () => {
  it('gets the products index endpoint', async (done) => {
    try {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
      done();
    } catch (error) {
       done.fail(error);
    }
  });
});
