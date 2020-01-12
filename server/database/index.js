import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.TESTDB,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Connected on Database');
  console.log('---------------------');
});

class Database{
  query(text, param) {
    try {
      return pool.query(text, param);
    } catch (err) {
      return err;
    }
  }
};

export default Database;