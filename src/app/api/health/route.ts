import { pool } from '@/db/permisidb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()');
    return NextResponse.json({ 
        status: 'ok', 
        time: result.rows[0].now,
        env: {
            hasNetlifyUrl: !!process.env.NETLIFY_DATABASE_URL,
            hasDbUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV,
            sslConfig: process.env.NODE_ENV === 'production' ? 'production-settings' : 'dev-settings'
        }
    });
  } catch (error) {
    return NextResponse.json({ 
        status: 'error', 
        message: error instanceof Error ? error.message : String(error),
        env: {
            hasNetlifyUrl: !!process.env.NETLIFY_DATABASE_URL,
            hasDbUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV
        }
    }, { status: 500 });
  }
}
