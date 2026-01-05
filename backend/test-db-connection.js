import { log } from 'console';
import sql from './utils/db.js';
import { r2Client } from './utils/r2Client.js';
import { ListBucketsCommand } from '@aws-sdk/client-s3';

async function testDBConnection() {
    console.log('--- Testing Database Connection Naja---');
    const start = performance.now();
    try {
        const [rows] = await sql.query('SELECT 1 + 1 AS result');
        const end = performance.now();
        console.log(`Database connection successful! (${(end - start).toFixed(2)} ms)`);

        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('   Check if the database host and port are correct.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('   Check if username and password are correct.');
        }
        return false;
    }
}

async function testR2Connection() {
    console.log('\n--- Testing Cloudflare R2 Connection Naja---');
    const start = performance.now();
    try {
        const command = new ListBucketsCommand({});
        const response = await r2Client.send(command);
        const end = performance.now();
        console.log(`R2 connection successful! (${(end - start).toFixed(2)} ms)`);
        console.log(`status : ${response.$metadata.httpStatusCode}`);
        return true;
    } catch (error) {
        console.error('R2 connection failed:', error.message);
        console.error('  Check your R2_ACCESS_KEY, R2_SECRET_KEY, and R2_STORAGE_URL in .env');
        return false;
    }
}

async function runTests() {
    console.log('Starting infrastructure connection tests...');

    const dbPassed = await testDBConnection();
    const r2Passed = await testR2Connection();

    console.log('\n--- Summary ---');
    console.log(`Database: ${dbPassed ? 'PASS' : 'FAIL'}`);
    console.log(`Cloudflare R2: ${r2Passed ? 'PASS' : 'FAIL'}`);

    if (dbPassed && r2Passed) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

runTests();

