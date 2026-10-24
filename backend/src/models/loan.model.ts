import { pool } from '../config/db';

// "overdue" is computed in SQL so the list and the summary always agree.
const LOAN_COLS = `
  id, friend_name AS "friendName", amount::float8 AS amount, due_date::text AS "dueDate",
  repaid_at AS "repaidAt", receipt_path AS "receiptPath",
  (repaid_at IS NULL AND due_date < CURRENT_DATE) AS overdue`;

export interface NewLoan {
  userId: number;
  friendName: string;
  amount: number;
  dueDate: string;
  receiptPath: string | null;
}

export async function createLoan(l: NewLoan) {
  const r = await pool.query(
    `INSERT INTO loans(user_id, friend_name, amount, due_date, receipt_path)
     VALUES ($1,$2,$3,$4,$5) RETURNING ${LOAN_COLS}`,
    [l.userId, l.friendName, l.amount, l.dueDate, l.receiptPath]
  );
  return r.rows[0];
}

export async function listLoans(userId: number) {
  const r = await pool.query(
    `SELECT ${LOAN_COLS} FROM loans WHERE user_id = $1
     ORDER BY (repaid_at IS NOT NULL), due_date`,
    [userId]
  );
  return r.rows;
}

export async function markRepaid(id: number, userId: number) {
  const r = await pool.query(
    `UPDATE loans SET repaid_at = now()
     WHERE id = $1 AND user_id = $2 AND repaid_at IS NULL RETURNING ${LOAN_COLS}`,
    [id, userId]
  );
  return r.rows[0] ?? null;
}

export async function getSummary(userId: number) {
  const r = await pool.query(
    `SELECT
       COALESCE(SUM(amount), 0)::float8 AS "totalLent",
       COALESCE(SUM(amount) FILTER (WHERE repaid_at IS NOT NULL), 0)::float8 AS "totalRepaid",
       COALESCE(SUM(amount) FILTER (WHERE repaid_at IS NULL AND due_date < CURRENT_DATE), 0)::float8 AS "overdueAmount"
     FROM loans WHERE user_id = $1`,
    [userId]
  );
  return r.rows[0];
}
