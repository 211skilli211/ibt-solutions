import { sql, testConnection, checkPlatformColumns, checkIBTTables } from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const connection = await testConnection();
    
    if (!connection.success) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Database connection failed',
        error: connection.error 
      }, { status: 500 });
    }

    const platformColumns = await checkPlatformColumns();
    const ibtTables = await checkIBTTables();

    return NextResponse.json({
      status: 'success',
      connection: {
        time: connection.now,
        version: connection.version
      },
      platformColumns,
      ibtTables,
      allSetup: platformColumns.users && platformColumns.stores && ibtTables.length >= 6
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: String(error) 
    }, { status: 500 });
  }
}