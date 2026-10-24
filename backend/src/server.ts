import { app } from './app';
import { env } from './config/env';
import { initDb } from './config/db';

initDb()
  .then(() => app.listen(env.port, () => console.log(`MiniLedger API running on :${env.port}`)))
  .catch((e: unknown) => { console.error('DB init failed', e); process.exit(1); });
