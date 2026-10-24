import request from 'supertest';
import { app } from '../src/app';

// These tests don't need a database: they only hit validation/auth guards.
describe('validation & auth guards', () => {
  it('rejects an invalid phone number', async () => {
    const r = await request(app).post('/auth/request-otp').send({ phone: 'abc' });
    expect(r.status).toBe(400);
  });
  it('rejects malformed OTP', async () => {
    const r = await request(app).post('/auth/verify-otp').send({ phone: '9999999999', otp: '12' });
    expect(r.status).toBe(400);
  });
  it('blocks loans without a token', async () => {
    expect((await request(app).get('/loans')).status).toBe(401);
    expect((await request(app).get('/summary')).status).toBe(401);
    expect((await request(app).post('/loans/1/repay')).status).toBe(401);
  });
});
