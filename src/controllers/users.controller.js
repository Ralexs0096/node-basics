import { getDbConnection } from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const db = await getDbConnection();
    const users = await db("users").select("*");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const user = await db("users").where({ id }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const db = await getDbConnection();
    const [newUserId] = await db("users").insert({ name, email });

    res.status(201).json({ message: "User created", id: newUserId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const db = await getDbConnection();
    const updated = await db("users").where({ id }).update({ name, email });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Database error" });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDbConnection();
    const deleted = await db("users").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Database error" });
  }
};
