import sql from './utils/db.js';

async function testConnection() {
    console.log(' Testing database connection...');
    const start = performance.now();
    try {
        const [rows] = await sql.query('SELECT 1 + 1 AS result');
        const end = performance.now();
        console.log(` Database connection successful! (${(end - start).toFixed(2)} ms)`);

        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Check if the database host and port are correct.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('username and password are correct ?');
        }
        process.exit(1);
    }
}

testConnection();
