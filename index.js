<<<<<<< HEAD
import express from "express";
=======
import express from 'express';
import {
  createAFruit,
  getAllFruits,
  getFruitById
} from './src/controllers/fruits.controller.js';
>>>>>>> d46f8daea19034087197aaff77b711a2eb930e9c

const app = express(); // instance (singleton)

// middleware
app.use(express.json());

<<<<<<< HEAD
app.get("/fruits", (request, response) => {
  response.send({
    message: "Fruits in the storage",
    fruits,
  });
});

app.post("/fruit", (req, res) => {
  const { fruit } = req.body;

  if (!fruit) {
    return res.status(400).send({ message: "Fruit is required", ok: false });
  }

  if (fruits.includes(fruit)) {
    return res.status(400).send({ message: "Fruit already exists", ok: false });
  }

  fruits.push(fruit);

  res.send({
    message: "Fruit is in the storage",
    ok: true,
  });
});
=======
// Routes
app.get('/fruits', getAllFruits);
app.get('/fruit/:id', getFruitById);
app.post('/fruit', createAFruit);
>>>>>>> d46f8daea19034087197aaff77b711a2eb930e9c

// listen
app.listen(5000, (error) => {
  if (error) {
    console.log({ error });
  }

  console.log("Server running on port 5000");
});
