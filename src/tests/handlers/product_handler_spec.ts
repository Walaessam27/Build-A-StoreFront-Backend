// @ts-ignore: missing type declarations for supertest
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string = '';
let productId: number; // سنخزن الـ ID هنا

describe('Product Endpoints', () => {
  beforeAll(async () => {
    const response = await request.post('/users').send({
      firstName: 'Product',
      lastName: 'Tester',
      password: 'password123'
    });
    token = response.body as string;
  });

  it('should create a product', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 100,
        category: 'test'
      });
    expect(response.status).toBe(200);
    productId = response.body.id; // أخذنا الـ ID الحقيقي للمنتج الذي أنشئ
  });

  it('should list products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('should show a product', async () => {
    // استخدمنا الـ ID الحقيقي بدل رقم 1
    const response = await request.get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test Product');
  });
});