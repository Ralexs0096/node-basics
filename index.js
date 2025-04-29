import express from 'express';
import {
  createFruit,
  getAllFruits,
  getFruitById,
  updateFruit,
  deleteFruitById
} from './src/controllers/fruits.controller.js';

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from './src/controllers/user.controller.js'; 

import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from './src/controllers/post.controller.js';

const app = express(); // instance (singleton)

// middleware
app.use(express.json());

// Fruit Routes
app.get('/fruits', getAllFruits);
app.get('/fruits/:id', getFruitById);
app.post('/fruits', createFruit);
app.put('/fruits/:id', updateFruit);
app.delete('/fruits/:id', deleteFruitById);

// User Routes 
app.get('/users', getAllUsers);         
app.post('/users', createUser);        
app.get('/users/:id', getUserById);   
app.put('/users/:id', updateUser);   
app.delete('/users/:id', deleteUser); 

// Post Routes
app.get('/posts', getAllPosts);        
app.post('/posts', createPost);       
app.get('/posts/:id', getPostById);  
app.put('/posts/:id', updatePost);    
app.delete('/posts/:id', deletePost);

app.listen(5000, (error) => {
  if (error) {
    console.log({ error });
  }

  console.log('Server running on port 5000');
});
