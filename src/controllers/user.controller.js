import db from '../config/database.js'; 

const errorMessage = { message: 'Something went wrong on the server.' };
const notFoundMessage = { message: 'User not found.' };
const SAFE_USER_COLUMNS = ['id', 'username', 'email', 'created_at']; 


export const getAllUsers = async (_, res) => {
    try {
        const users = await db('users').select(SAFE_USER_COLUMNS);
        res.status(200).json({
            message: 'Users retrieved successfully',
            data: { users },
            success: true
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format.', success: false });
    }

    try {
        const user = await db('users').where({ id }).select(SAFE_USER_COLUMNS).first();
        if (!user) {
            return res.status(404).json({ ...notFoundMessage, success: false });
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            data: { user },
            success: true
        });
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};


export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const newUser = { username, email, password: password }; 

        const [insertedId] = await db('users').insert(newUser);
        const createdUser = await db('users').where({ id: insertedId }).select(SAFE_USER_COLUMNS).first();

        res.status(201).json({
            message: 'User created successfully',
            data: { user: createdUser },
            success: true
        });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('UNIQUE constraint')) {
             return res.status(409).json({ message: 'Username or email already exists.', success: false });
        }
        res.status(500).json({ ...errorMessage, success: false });
    }
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format.', success: false });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update.', success: false });
    }

    try {
        const affectedRows = await db('users').where({ id }).update(updateData);

        if (affectedRows === 0) {
  
            const userExists = await db('users').where({id}).first();
            return res.status(userExists ? 200 : 404).json({ message: userExists ? 'User updated successfully (no change detected).' : 'User not found.', success: userExists });
        }

        const updatedUser = await db('users').where({ id }).select(SAFE_USER_COLUMNS).first();

        res.status(200).json({
            message: 'User updated successfully',
            data: { user: updatedUser },
            success: true
        });
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
         if (error.code === 'ER_DUP_ENTRY' || error.message.includes('UNIQUE constraint')) {
             return res.status(409).json({ message: 'Username or email already exists.', success: false });
        }
        res.status(500).json({ ...errorMessage, success: false });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format.', success: false });
    }

    try {
 
        const affectedRows = await db('users').where({ id }).del();

        if (affectedRows === 0) {
            return res.status(404).json({ ...notFoundMessage, success: false });
        }
        res.status(204).send(); 

    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        res.status(500).json({ ...errorMessage, success: false });
    }
};