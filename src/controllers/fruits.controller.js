import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, "fruits.txt");
const fruits = [];

const initializeStorage = async () => {
  try {
    const fileContent = await fs
      .readFile(FILE_PATH, "utf-8")
      .catch(async () => {
        await fs.writeFile(FILE_PATH, "", "utf-8");
        return "";
      });

    fruits.push(
      ...fileContent.split("\n").filter((fruit) => fruit.trim() !== "")
    );
    console.log(`Loaded ${fruits.length} fruits from ${FILE_PATH}`);
  } catch (err) {
    console.error("Error initializing the fruits file:", err);
  }
};

const saveFruits = async () => {
  try {
    await fs.writeFile(FILE_PATH, fruits.join("\n"), "utf-8");
  } catch (err) {
    console.error("Error saving fruits:", err);
  }
};

initializeStorage();

export { fruits, saveFruits };

export const getAllFruits = (_, response) => {
  response.send({
    message: "Fruits in the storage",
    fruits,
  });
};

export const createAFruit = async (req, res) => {
  const { fruit } = req.body;

  if (!fruit) {
    return res.status(400).send({ message: "Fruit is required", ok: false });
  }

  if (fruits.includes(fruit)) {
    return res.status(400).send({ message: "Fruit already exists", ok: false });
  }

  fruits.push(fruit);
  await saveFruits();

  res.send({
    message: "Fruit is in the storage",
    ok: true,
  });
};

export const getFruitById = (req, res) => {
  const { id } = req.params;

  console.log(req.query);
  console.log({ param: id });

  res.send({ id });
};
