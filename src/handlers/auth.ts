import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } else {
        res.status(401).json('Unauthorized: Missing Token');
    }
  } catch (error) {
    res.status(401).json(`Access denied, invalid token: ${error}`);
  }
};

export default verifyAuthToken;