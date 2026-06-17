import { Request, Response, Application } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from './auth';

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    password: req.body.password as string,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

const user_routes = (app: Application): void => {
  app.get('/users', verifyAuthToken, index);
  app.post('/users', create);
};

export default user_routes;