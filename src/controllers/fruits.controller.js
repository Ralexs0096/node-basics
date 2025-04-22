import { getDbConnection } from '../config/db.js';
import {
  createFruitsQuery,
  getAllFruitsQuery
} from '../query/fruitsQueries.js';

const errorMessage = {
  message: 'Something went wrong!'
};

const fruitsTable = 'tbl_fruits';

export const getAllFruits = async (_, response) => {
  const knex = await getDbConnection();
  if (!knex) {
    response.status(500).send(errorMessage);
  }

  try {
    const results = await knex.select().from(fruitsTable);

    response.send({
      fruits: results
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
    message: 'Fruit is in the storage'
  };

  if (!fruit) {
    res.send({
      message: 'Fruit name is required'
    });
    return;
  }

  const knex = await getDbConnection();

  if (!knex) {
    response.status(500).send(errorMessage);
  }

  try {
    // await connection.query(createFruitsQuery, [parsedFruit, 'Admin']);
    await knex(fruitsTable).insert({ name: parsedFruit, createdBy: 'Admin' });
  } catch (error) {
    console.log(error);
    res.send(errorMessage);
  }

  res.send(successResponse);
};

export const getFruitById = (req, res) => {
  // const fruitId = req.params.id
  const { id } = req.params;

  console.log(req.query);
  console.log({ param: id });

  // const fruit = {
  //   id: 1,
  //   name: 'orange',
  //   creator: 'Carlos'
  // }

  res.send({ id });
};
