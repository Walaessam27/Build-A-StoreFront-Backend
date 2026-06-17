import { Request, Response, Application } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from './auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(req.params.id);
    if (!product) {
        res.status(404).json('Product not found');
        return;
    }
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name as string,
      price: parseInt(req.body.price as string),
      category: req.body.category as string,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const product_routes = (app: Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default product_routes;