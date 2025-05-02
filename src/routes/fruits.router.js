import { Router } from "express";
import {
  createFruit,
  getAllFruits,
  getFruitById,
} from "../controllers/fruits.controller.js";
import { deleteFruitById } from "../controllers/fruits.controller.js";

const router = new Router();

router.get("/", getAllFruits);
router.get("/:id", getFruitById);
router.post("/", createFruit);
router.delete("/:id", deleteFruitById);

export default router;
