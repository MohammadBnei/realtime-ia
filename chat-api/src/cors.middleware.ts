import { Request, Response } from 'express';

export function socketIOMiddleware(req: Request, res: Response, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
}
