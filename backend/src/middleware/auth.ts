import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthRequest } from '../types';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, env.jwtSecret) as { uid: number };
    (req as AuthRequest).userId = payload.uid;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
