import knex from 'knex';

export const getDbConnection = async () => {
  try {
    const db = knex({
      client: 'mysql2',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'node_db',
        password: 'ThisIsTheRootPassword'
      }
    });
    return db;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
