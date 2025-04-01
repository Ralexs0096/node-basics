const fruits = []; // in memory

export const getAllFruits = (_, response) => {
  response.send({
    message: "Fruits in the storage",
    fruits,
  });
};

export const createAFruit = (req, res) => {
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
};

export const getFruitById = (req, res) => {
  // const fruitId = req.params.id
  const { id } = req.params;

  console.log(req.query);
  console.log({ param: id });

  res.send({ id });
};
