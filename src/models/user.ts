import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id, firstName, lastName FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Could not get users. " + err);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES($1, $2, $3) RETURNING id, firstName, lastName';
      
      const rounds = parseInt(SALT_ROUNDS as string) || 10;
      const pass = (u.password as string) + BCRYPT_PASSWORD;
      
      // استخدام any هنا ينهي مشكلة الـ Type mismatch تماماً
      const hash = bcrypt.hashSync(pass as any, rounds as any);

      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error("Could not add user. " + err);
    }
  }
}
