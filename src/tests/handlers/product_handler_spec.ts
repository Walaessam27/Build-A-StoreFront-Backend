// @ts-ignore: missing type declarations for supertest

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string = '';

describe('Product Endpoints', () => {
  beforeAll(async () => {
    // نحصل على توكن أولاً لأن إنشاء منتج يحتاج توكن
    const response = await request.post('/users').send({
      firstName: 'Product',
      lastName: 'Tester',
      password: 'password123'
    });
    token = response.body;
  });

  it('should create a product (requires token)', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 100,
        category: 'test'
      });
    expect(response.status).toBe(200);
  });

  it('should list products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('should show a product', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
});