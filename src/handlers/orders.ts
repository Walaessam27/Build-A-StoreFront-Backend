import { Request, Response, Application } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from './auth';

const store = new OrderStore();

const currentOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt((req as any).params.id);
    const order = await store.currentOrder(userId);
    (res as any).json(order);
  } catch (err) {
    (res as any).status(400).json(err);
  }
};

const order_routes = (app: Application) => {
  (app as any).get('/users/:id/current-order', verifyAuthToken, currentOrder);
};

export default order_routes;
