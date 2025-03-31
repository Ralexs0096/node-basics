const fruits = []; // in memory

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

  res.status(201).send({
    message: 'Fruit has been added to the storage',
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
