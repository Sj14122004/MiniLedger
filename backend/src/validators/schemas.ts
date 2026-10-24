import { z } from 'zod';

const phone = z.string().regex(/^\+?\d{10,13}$/, 'Invalid phone number');

export const requestOtpSchema = z.object({ phone });

export const verifyOtpSchema = z.object({
  phone,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const createLoanSchema = z.object({
  friendName: z.string().trim().min(1, 'Friend name required').max(100),
  amount: z.coerce.number().positive('Amount must be greater than 0').max(10_000_000),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Due date must be YYYY-MM-DD'),
});
