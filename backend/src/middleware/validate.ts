import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

// Checks req.body against a zod schema; replaces it with the cleaned data or returns 400.
export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });
  req.body = result.data;
  next();
};
