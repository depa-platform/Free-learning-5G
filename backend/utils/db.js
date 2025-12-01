import mysql from 'mysql2/promise';

const sql = mysql.createPool({
  host: 'db-5g.czavqmfbxgsa.ap-southeast-1.rds.amazonaws.com',
  user: 'admin_platform5g',
  password: 'platform_5g_db2025',
  database: '5G_DB',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default sql;