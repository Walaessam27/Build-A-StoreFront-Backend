import { Request, Response, Application } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from './auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    (res as any).json(products);
  } catch (err) {
    (res as any).status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: (req as any).body.name,
      price: (req as any).body.price,
      category: (req as any).body.category,
    };
    const newProduct = await store.create(product);
    (res as any).json(newProduct);
  } catch (err) {
    (res as any).status(400).json(err);
  }
};

const product_routes = (app: Application) => {
  (app as any).get('/products', index);
  (app as any).post('/products', verifyAuthToken, create); // أضفنا الحماية هنا
};

export default product_routes;
