import sql from './utils/db.js';

async function testConnection() {
    console.log('Testing database connection...');
    try {
        const [rows] = await sql.query('SELECT 1 + 1 AS result');
        console.log(' Database connection successful!');
        console.log('Test Request Result:', rows[0].result);
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Hint: Check if the database host and port are correct.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Hint: Check if your username and password are correct in .env');
        }
        process.exit(1);
    }
}

testConnection();
