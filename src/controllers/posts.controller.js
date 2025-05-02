import { getDbConnection } from "../config/db.js";

export const getAllPosts = async (req, res) => {
  try {
    const db = await getDbConnection();
    const posts = await db("posts").select("*");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDbConnection();
    const post = await db("posts").where({ id }).first();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error getting post by ID:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const db = await getDbConnection();
    const [id] = await db("posts").insert({ title, content, user_id });

    res.status(201).json({ id, title, content, user_id });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const db = await getDbConnection();
    const updated = await db("posts").where({ id }).update({ title, content });

    if (!updated) {
      return res.status(404).json({ message: "Post not found or not updated" });
    }

    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const db = await getDbConnection();
    const deleted = await db("posts").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Database error" });
  }
};
