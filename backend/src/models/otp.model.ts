import { pool } from '../config/db';

export async function saveOtp(phone: string, code: string) {
  await pool.query(
    `INSERT INTO otps(phone, code, expires_at) VALUES ($1, $2, now() + interval '5 minutes')
     ON CONFLICT (phone) DO UPDATE SET code = $2, expires_at = now() + interval '5 minutes'`,
    [phone, code]
  );
}

// Deletes the OTP if it matches and hasn't expired, so each OTP works only once.
export async function consumeOtp(phone: string, code: string): Promise<boolean> {
  const r = await pool.query(
    `DELETE FROM otps WHERE phone = $1 AND code = $2 AND expires_at > now() RETURNING phone`,
    [phone, code]
  );
  return (r.rowCount ?? 0) > 0;
}
