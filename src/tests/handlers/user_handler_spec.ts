// @ts-ignore: missing type declarations for supertest
import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);
let token: string = '';
let userId: number; // سنخزن الـ ID هنا

describe('User Endpoints', () => {
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
    
    // لفك تشفير التوكن ومعرفة الـ ID الحقيقي للمستخدم
    const decoded = jwt.decode(token) as { user: { id: number } };
    userId = decoded.user.id; 
  });

  it('should list users (requires token)', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get a user by id (requires token)', async () => {
    // استخدمنا الـ ID الحقيقي الذي حصلنا عليه من التوكن
    const response = await request
      .get(`/users/${userId}`) 
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toEqual('Ahmad');
  });
});

  it('should show a user by id', async () => {
  const response = await request
    .get(`/users/${userId}`) 
    .set('Authorization', `Bearer ${token}`);
  expect(response.status).toBe(200);
});
