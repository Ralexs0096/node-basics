const fruits = []; // in memory

export const getAllFruits = (_, response) => {
  response.send({
    message: 'Fruits in the storage',
    fruits
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
