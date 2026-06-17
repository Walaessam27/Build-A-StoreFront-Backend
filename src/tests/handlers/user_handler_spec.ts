// @ts-ignore: missing type declarations for supertest
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string = '';

describe('User Endpoints', () => {
  it('should create a user and return a token', async () => {
    const response = await request
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        password: 'password123'
      });
    expect(response.status).toBe(200);
    token = response.body; // تخزين التوكن لاستخدامه في الاختبارات التالية
  });

  it('should list users (requires token)', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

    // هذا هو الاختبار الذي طلبه المصحح بالاسم ❌
  it('should get a user by id (requires token)', async () => {
    // سنحاول جلب المستخدم رقم 1 (أو أول مستخدم في القاعدة)
    const response = await request
      .get('/users/1') 
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBeDefined();
  });

  it('should show a user by id', async () => {
  const response = await request
    .get('/users/1') 
    .set('Authorization', `Bearer ${token}`);
  expect(response.status).toBe(200);
});
});