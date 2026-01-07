import { Pool } from 'pg';

const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: (process.env.NODE_ENV === 'production' || (connectionString && !connectionString.includes('localhost')))
    ? { rejectUnauthorized: false }
    : false,
});

export { pool };
