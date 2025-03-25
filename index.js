import express from "express";

const app = express(); // instance (singleton)

const fruits = []; // in memory

// middleware
app.use(express.json());

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

app.listen(5000, (error) => {
  if (error) {
    console.log({ error });
  }

  console.log("Server running on port 5000");
});
