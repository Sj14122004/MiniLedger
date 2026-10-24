import { Request, Response } from 'express';
import * as Loan from '../models/loan.model';
import { AuthRequest } from '../types';
import { HttpError } from '../utils/HttpError';

const uid = (req: Request) => (req as AuthRequest).userId;

export async function create(req: Request, res: Response) {
  const loan = await Loan.createLoan({
    userId: uid(req),
    ...req.body,
    receiptPath: req.file ? `/uploads/${req.file.filename}` : null,
  });
  res.status(201).json(loan);
}

export async function list(req: Request, res: Response) {
  res.json(await Loan.listLoans(uid(req)));
}

export async function repay(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Bad id');
  const loan = await Loan.markRepaid(id, uid(req));
  if (!loan) throw new HttpError(404, 'Loan not found or already repaid');
  res.json(loan);
}

export async function summary(req: Request, res: Response) {
  res.json(await Loan.getSummary(uid(req)));
}
