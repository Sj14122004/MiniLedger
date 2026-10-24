import { NextFunction, Request, RequestHandler, Response } from 'express';

// Express 4 doesn't catch errors thrown inside async handlers, so we forward them to next().
export const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<unknown>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };
