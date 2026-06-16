import { Request, Response, Application } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: (req as any).body.firstName,
        lastName: (req as any).body.lastName,
        password: (req as any).body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        (res as any).json(token);
    } catch (err) {
        (res as any).status(400).json(err);
    }
};

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        (res as any).json(users);
    } catch (err) {
        (res as any).status(400).json(err);
    }
};

const user_routes = (app: Application) => {
    (app as any).get('/users', index);
    (app as any).post('/users', create);
};

export default user_routes;
