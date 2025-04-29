export const getAllFruitsQuery = "SELECT * FROM tbl_fruits";

export const createFruitsQuery =
  "INSERT INTO tbl_fruits (name, createdBy) VALUES (?, ?)";

import { getDbConnection } from "../config/db.js";

export const deleteFruitQuery = async (id) => {
  const db = await getDbConnection();
  return await db("tbl_fruits").where({ id }).del();
};
