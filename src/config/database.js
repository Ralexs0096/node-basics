import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'node_db'
};

const knexConfig = {
  client: 'mysql2',
  connection: dbConfig,
  pool: { min: 0, max: 10 } 
};

const db = knex(knexConfig);

export default db;
