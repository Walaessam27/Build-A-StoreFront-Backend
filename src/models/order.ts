import Client from '../database';

export interface Order {
  id?: number;
  user_id: number;
  status: string;
}

export interface OrderProduct {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string;
}

export class OrderStore {
  // إنشاء طلب جديد
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  // جلب الطلب الحالي
  async currentOrder(userId: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=\'active\' LIMIT 1';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order: ${err}`);
    }
  }

  // إضافة منتج لطلب موجود (هذا ما طلبه المصحح)
  async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProduct> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
}