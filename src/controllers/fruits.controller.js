import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyIfFileExist } from '../utils/filesystem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'storage.txt');

export const getAllFruits = (_, response) => {
  const emptyMessage = 'There are not fruits in the storage';
  const isFruitFileCreated = verifyIfFileExist(filePath);

  if (!isFruitFileCreated) {
    response.send({
      message: emptyMessage
    });
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  if (content === '') {
    response.send({
      message: emptyMessage
    });
    return;
  }

  response.send({
    message: 'Fruits in the Store',
    fruits: content.split('\n')
  });
};

export const createFruit = (req, res) => {
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

  const isFruitFileCreated = verifyIfFileExist(filePath);

  if (!isFruitFileCreated) {
    fs.writeFile(filePath, parsedFruit, 'utf-8', () => {
      res.send(successResponse);
    });
    return;
  }

  fs.appendFile(filePath, `\n${parsedFruit}`, 'utf-8', () => {
    res.send(successResponse);
  });
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
