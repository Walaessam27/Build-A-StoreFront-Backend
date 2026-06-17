// @ts-ignore: missing type declarations for supertest
import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);
let token: string = '';
let userId: number;

describe('User Endpoints', () => {
  // 1. اختبار إنشاء مستخدم (Create)
  it('should create a user and return a token', async () => {
    const response = await request
      .post('/users')
      .send({
        firstName: 'Ahmad',
        lastName: 'Ali',
        password: 'password123'
      });
    expect(response.status).toBe(200);
    token = response.body as string;
    
    // فك تشفير التوكن للحصول على الـ ID الحقيقي
    const decoded = jwt.decode(token) as { user: { id: number } };
    userId = decoded.user.id; 
  });

  // 2. اختبار عرض قائمة المستخدمين (Index)
  it('should list users (requires token)', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 3. اختبار عرض مستخدم واحد بواسطة الـ ID (Show) - طلب المصحح
  it('should get a user by id (requires token)', async () => {
    const response = await request
      .get(`/users/${userId}`) 
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toEqual('Ahmad');
  });
});