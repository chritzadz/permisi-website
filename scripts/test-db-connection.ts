// scripts/test-db-connection.ts
import { pool } from '../src/db/permisidb';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`NETLIFY_DATABASE_URL defined: ${!!process.env.NETLIFY_DATABASE_URL}`);
    console.log(`DATABASE_URL defined: ${!!process.env.DATABASE_URL}`);

    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful!');
    console.log('Database Time:', res.rows[0].now);
    
    await pool.end();
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

testConnection();
