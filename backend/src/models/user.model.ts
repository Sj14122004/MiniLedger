import { pool } from '../config/db';

export async function findOrCreateByPhone(phone: string): Promise<number> {
  const r = await pool.query(
    `INSERT INTO users(phone) VALUES ($1)
     ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone
     RETURNING id`,
    [phone]
  );
  return r.rows[0].id;
}
