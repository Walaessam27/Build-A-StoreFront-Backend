// @ts-ignore: missing type declarations for supertest
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string = '';
let productId: number;

describe('Product Endpoints', () => {
  beforeAll(async () => {
    // إنشاء مستخدم للحصول على توكن ضروري لعملية إنشاء منتج
    const response = await request.post('/users').send({
      firstName: 'Product',
      lastName: 'Tester',
      password: 'password123'
    });
    token = response.body as string;
  });

  // 1. اختبار إنشاء منتج (Create)
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
    productId = response.body.id; // حفظ الـ ID الحقيقي للمنتج
  });

  // 2. اختبار عرض قائمة المنتجات (Index)
  it('should list products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 3. اختبار عرض منتج واحد بواسطة الـ ID (Show)
  it('should show a product', async () => {
    const response = await request.get(`/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Test Product');
  });
});