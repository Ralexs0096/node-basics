import mysql from 'mysql2/promise';

export const getDbConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node_db',
    password: 'ThisIsTheRootPassword'
  });

  return connection;
};
