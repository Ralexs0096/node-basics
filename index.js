import express from 'express';

const app = express(); // instance (singleton)

const fruits = []; // in memory

// middleware
app.use(express.json());

app.get('/fruits', (request, response) => {
  response.send({
    message: 'Fruits in the storage',
    fruits
  });
});

app.post('/fruit', (req, res) => {
  const { fruit } = req.body;
  if (!!fruit) {
    // Add validation to prevent repeated fruits
    fruits.push(fruit);
  }

  res.send({
    message: 'Fruit is in the storage',
    ok: true
  });
});

app.get('/fruit/:id', (req, res) => {
  // const fruitId = req.params.id
  const { id } = req.params;

  console.log(req.query);
  console.log({ param: id });

  res.send({ id });
});

app.listen(5000, (error) => {
  if (error) {
    console.log({ error });
  }

  console.log('Server running on port 5000');
});
