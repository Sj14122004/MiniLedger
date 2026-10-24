import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function requestOtp(req: Request, res: Response) {
  await authService.requestOtp(req.body.phone);
  res.json({ message: 'OTP sent (check server log)' });
}

export async function verifyOtp(req: Request, res: Response) {
  const token = await authService.verifyOtp(req.body.phone, req.body.otp);
  res.json({ token });
}
