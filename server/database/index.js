import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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