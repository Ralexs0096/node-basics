import mysql from 'mysql2/promise';

export const getDbConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'node_db',
      password: 'ThisIsTheRootPassword'
    });

    return connection;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
