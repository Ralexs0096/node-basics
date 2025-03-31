import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'fruits.txt');
const fruits = []; 

fs.exists(FILE_PATH, (exists) => {
    if (exists) {
        fs.readFile(FILE_PATH, 'utf-8', (err, fileContent) => {
            if (err) {
                console.error("Error reading fruits file:", err);
                // Continue with an empty 'fruits' array if loading failed
                return;
            }
            const loadedFruits = fileContent.split('\n').filter(fruit => fruit.trim() !== '');
            fruits.push(...loadedFruits);
            console.log(`Loaded ${fruits.length} fruits from ${FILE_PATH}`);
        });
    } else {
        fs.writeFile(FILE_PATH, '', 'utf-8', (err) => {
            if (err) {
                console.error("Error creating empty fruits file:", err);
                // In a real app, you might want to handle this more gracefully
                return;
            }
            console.log(`Created empty fruits file: ${FILE_PATH}`);
        });
    }
});

const saveFruits = () => {
    const dataToWrite = fruits.join('\n'); // Join array elements with newline
    fs.writeFile(FILE_PATH, dataToWrite, 'utf-8', (err) => {
        if (err) {
            // Log an error if saving fails, but the app will continue running
            console.error("Error saving fruits to file:", err);
            // In a real app, you might want to handle this more gracefully
        }
    });
};

export const getAllFruits = (_, response) => {
  response.send({
    message: 'Fruits in the storage',
    fruits
  });
};

export const createAFruit = (req, res) => {
  const { fruit } = req.body;
  if (!fruit) {
    return res.status(400).send({
      message: 'Fruit name is required',
      ok: false
    });
  }

  // Validation to prevent repeated fruits
  if (fruits.includes(fruit)) {
    return res.status(409).send({
      message: 'Fruit already exists',
      ok: false
    });
  }

  fruits.push(fruit);
  saveFruits();

  res.status(201).send({
    message: `Fruit '${fruit}' has been added to the storage`,
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
