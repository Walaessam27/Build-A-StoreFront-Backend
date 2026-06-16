import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  // جلب الطلب الحالي (active) لمستخدم معين
  async currentOrder(userId: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=\'active\' LIMIT 1';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error("Could not get current order. " + err);
    }
  }
}
