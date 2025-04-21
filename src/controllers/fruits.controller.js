import { getDbConnection } from '../config/database.js'; 
import {
    getAllFruitsQuery,
    getFruitByIdQuery,
    createFruitQuery,
    deleteFruitByIdQuery
} from '../query/fruitsQueries.js'; 

const errorMessage = { message: 'Something went wrong on the server.' };
const notFoundMessage = { message: 'Fruit not found.' };

export const getAllFruits = async (_, res) => {
    let connection;
    try {
        connection = await getDbConnection();
        const [results] = await connection.query(getAllFruitsQuery);
        res.status(200).send({
            message: 'Fruits retrieved successfully',
            fruits: results
        });
    } catch (error) {
        console.error("Error fetching all fruits:", error);
        res.status(500).send(errorMessage);
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error("Error closing connection:", closeError);
            }
        }
    }
};

export const createFruit = async (req, res) => {
    const { fruit } = req.body; 
    const createdBy = 'Admin';

    if (!fruit || typeof fruit !== 'string' || fruit.trim() === '') {
        return res.status(400).send({ message: 'Field cannot be empty' });
    }

    const parsedFruit = fruit.trim().toLowerCase(); 

    let connection;
    try {
        connection = await getDbConnection();
        const [result] = await connection.query(createFruitQuery, [parsedFruit, createdBy]);

        res.status(201).send({
            message: `Fruit '${parsedFruit}' added successfully`,
            insertedId: result.insertId 
        });

    } catch (error) {
        console.error("Error creating fruit:", error);
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(409).send({ message: `Fruit '${parsedFruit}' already exists.` });
        }

        res.status(500).send(errorMessage);
    } finally {
        if (connection) {
             try {
                await connection.end();
            } catch (closeError) {
                console.error("Error closing connection:", closeError);
            }
        }
    }
};

// --- Assignment 1: Get Fruit By ID ---
export const getFruitById = async (req, res) => {
    const { id } = req.params; 

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
         return res.status(400).send({ message: 'Invalid ID format. ID must be a positive integer.' });
    }

    let connection;
    try {
        connection = await getDbConnection();
        const [results] = await connection.query(getFruitByIdQuery, [id]);

        if (results.length === 0) {
            res.status(404).send(notFoundMessage);
        } else {
            res.status(200).send({
                message: 'Fruit retrieved successfully',
                fruit: results[0] 
            });
        }
    } catch (error) {
        console.error(`Error fetching fruit with id ${id}:`, error);
        res.status(500).send(errorMessage);
    } finally {
        if (connection) {
             try {
                await connection.end();
            } catch (closeError) {
                console.error("Error closing connection:", closeError);
            }
        }
    }
};

// --- Assignment 2: Delete Fruit By ID ---
export const deleteFruitById = async (req, res) => {
    const { id } = req.params; 

     if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
         return res.status(400).send({ message: 'Invalid ID format. ID must be a positive integer.' });
    }

    let connection;
    try {
        connection = await getDbConnection();
        const [result] = await connection.query(deleteFruitByIdQuery, [id]);

        if (result.affectedRows === 0) {
            res.status(404).send(notFoundMessage);
        } else {
            res.status(200).send({ message: `Fruit with id ${id} deleted successfully.` });
        }
    } catch (error) {
        console.error(`Error deleting fruit with id ${id}:`, error);
        res.status(500).send(errorMessage);
    } finally {
        if (connection) {
             try {
                await connection.end();
            } catch (closeError) {
                console.error("Error closing connection:", closeError);
            }
        }
    }
};