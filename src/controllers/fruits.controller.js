import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'fruits.txt');

export const getAllFruits = (_, response) => {
  const isFruitFileCreated = fs.existsSync(filePath);

  if (!isFruitFileCreated) {
    response.send({
      message: 'There are not fruits in the storage'
    });
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  if (content === '') {
    response.send({
      message: 'There are not fruits in the storage'
    });
    return;
  }

  response.send({
    message: 'Fruits in the Store',
    fruits: content.split('\n')
  });
};

export const createAFruit = (req, res) => {
  const { fruit } = req.body;
  if (!!fruit) {
    // Add validation to prevent repeated fruits
    fruits.push(fruit);
  }

  res.send({
    message: 'Fruit is in the storage',
    ok: true
  });
};

export const getFruitById = (req, res) => {
  // const fruitId = req.params.id
  const { id } = req.params;

  console.log(req.query);
  console.log({ param: id });

  res.send({ id });
};
