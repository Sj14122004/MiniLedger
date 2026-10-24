import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { consumeOtp, saveOtp } from '../models/otp.model';
import { findOrCreateByPhone } from '../models/user.model';
import { HttpError } from '../utils/HttpError';

export async function requestOtp(phone: string) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  await saveOtp(phone, code);
  console.log(`[MOCK OTP] ${phone} -> ${code}`); // the "SMS" is just the server log
}

export async function verifyOtp(phone: string, otp: string): Promise<string> {
  if (!(await consumeOtp(phone, otp))) throw new HttpError(401, 'Wrong or expired OTP');
  const userId = await findOrCreateByPhone(phone);
  return jwt.sign({ uid: userId }, env.jwtSecret, { expiresIn: '7d' });
}
