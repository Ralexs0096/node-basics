import knex from "knex";

export const getDbConnection = async () => {
  try {
    const db = knex({
      client: "mysql2",
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        database: "fruits_db",
        password: "my-secret-pw",
      },
    });
    return db;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default getDbConnection;
