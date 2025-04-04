import express from 'express';
import {
  createFruit,
  getAllFruits,
  getFruitById
} from './src/controllers/fruits.controller.js';

const app = express(); // instance (singleton)

// middleware
app.use(express.json());

// Routes
app.get('/fruits', getAllFruits);
app.get('/fruit/:id', getFruitById);
app.post('/fruit', createFruit);

// listen
app.listen(5000, (error) => {
  if (error) {
    console.log({ error });
  }

  console.log('Server running on port 5000');
});
