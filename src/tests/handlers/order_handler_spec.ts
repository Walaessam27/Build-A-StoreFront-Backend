// @ts-ignore: missing type declarations for supertest

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string = '';

describe('Order Endpoints', () => {
  beforeAll(async () => {
    const response = await request.post('/users').send({
      firstName: 'Order',
      lastName: 'Tester',
      password: 'password123'
    });
    token = response.body;
  });

  it('should get current order for user (requires token)', async () => {
    const response = await request
      .get('/users/1/current-order')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});