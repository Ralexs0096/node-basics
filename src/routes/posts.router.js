import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);

export default router;
