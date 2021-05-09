import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não existe.' });
  }

  const [, token] = authorization.split(' ');

  try {

    const data = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
    
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }

}