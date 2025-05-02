import { getDbConnection } from "../config/db.js";
import {
  createFruitsQuery,
  getAllFruitsQuery,
} from "../query/fruitsQueries.js";

const errorMessage = {
  message: "Something went wrong!",
};

const fruitsTable = "tbl_fruits";

export const getAllFruits = async (_, response) => {
  const knex = await getDbConnection();
  if (!knex) {
    response.status(500).send(errorMessage);
  }

  try {
    const results = await knex.select().from(fruitsTable);

    response.send({
      fruits: results,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send(errorMessage);
  }
};

export const createFruit = async (req, res) => {
  const { fruit } = req.body;
  const parsedFruit = fruit.toLowerCase();
  const successResponse = {
    message: "Fruit is in the storage",
  };

  if (!fruit) {
    res.send({
      message: "Fruit name is required",
    });
    return;
  }

  const knex = await getDbConnection();

  if (!knex) {
    response.status(500).send(errorMessage);
  }

  try {
    await knex(fruitsTable).insert({ name: parsedFruit, createdBy: "Admin" });
  } catch (error) {
    console.log(error);
    res.send(errorMessage);
  }

  res.send(successResponse);
};

export const getFruitById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing fruit ID" });
  }

  try {
    const fruit = await knex("tbl_fruits")
      .select("id", "name", "createdBy as creator")
      .where({ id })
      .first();

    if (!fruit) {
      return res.status(404).json({ message: "Fruit not found" });
    }

    res.status(200).json(fruit);
  } catch (error) {
    console.error("Error retrieving fruit:", error.message);
    res.status(500).json({ message: "Database error" });
  }
};

// fruits.controller.js
import { deleteFruitQuery } from "../query/fruitsQueries.js";

export const deleteFruitById = async (req, res) => {
  try {
    const { id } = req.params;
    const fruitId = parseInt(id);

    if (isNaN(fruitId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const result = await deleteFruitQuery(fruitId); // ✅ Solo el número
    res.status(200).json({ message: "Fruit deleted", result });
  } catch (error) {
    console.error("Error deleting fruit:", error.message);
    res.status(500).json({ message: "Database error" });
  }
};
