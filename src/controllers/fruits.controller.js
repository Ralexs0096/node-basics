import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'fruits.txt');
const fruits = []; 

// --- Initialization: Load fruits from file on startup ---
fs.access(FILE_PATH, fs.constants.F_OK, (err) => {
    if (err) {
        // File does not exist or other error occurred
        fs.writeFile(FILE_PATH, '', 'utf-8', (writeErr) => {
            if (writeErr) {
                console.error("Error creating empty fruits file:", writeErr);
                return;
            }
            console.log(`Created empty fruits file: ${FILE_PATH}`);
        });
        return;
    }

    // File exists, so read it
    fs.readFile(FILE_PATH, 'utf-8', (readErr, fileContent) => {
        if (readErr) {
            console.error("Error reading fruits file:", readErr);
            return;
        }
        const loadedFruits = fileContent.split('\n').filter(fruit => fruit.trim() !== '');
        fruits.push(...loadedFruits);
        console.log(`Loaded ${fruits.length} fruits from ${FILE_PATH}`);
    });
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
