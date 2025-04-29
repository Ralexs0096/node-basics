import db from '../config/database.js';

const errorMessage = { message: 'Something went wrong on the server.' };
const notFoundMessage = { message: 'Fruit not found.' };

export const getAllFruits = async (_, res) => {
  try {
    const fruits = await db('tbl_fruits').select('id', 'name', 'createdBy');
    res.status(200).json({
      message: 'Fruits retrieved successfully',
      data: { fruits },
      success: true
    });
  } catch (error) {
    console.error("Error fetching all fruits:", error);
    res.status(500).json({ ...errorMessage, success: false });
  }
};

export const createFruit = async (req, res) => {
  const { fruit } = req.body;
  const createdBy = 'Admin';

  if (!fruit || typeof fruit !== 'string' || fruit.trim() === '') {
    return res.status(400).json({
      message: 'Fruit name is required and must be a non-empty string',
      success: false
    });
  }

  const parsedFruit = fruit.trim().toLowerCase();

  try {
    const existingFruit = await db('tbl_fruits')
      .whereRaw('LOWER(name) = ?', [parsedFruit])
      .first();

    if (existingFruit) {
      return res.status(409).json({
        message: `Fruit '${parsedFruit}' already exists`,
        success: false
      });
    }

    const [insertedId] = await db('tbl_fruits').insert({ name: parsedFruit, createdBy });
    res.status(201).json({
      message: `Fruit '${parsedFruit}' added successfully`,
      data: { insertedId },
      success: true
    });
  } catch (error) {
    console.error("Error creating fruit:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: `Fruit '${parsedFruit}' already exists`,
        success: false
      });
    }
    res.status(500).json({ ...errorMessage, success: false });
  }
};

export const updateFruit = async (req, res) => {
    const { id } = req.params;
    const { fruit } = req.body;

    if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
        return res.status(400).json({ message: 'Invalid ID format. ID must be a positive integer', success: false });
    }

    if (fruit === undefined || fruit === null || typeof fruit !== 'string' || fruit.trim() === '') {
         return res.status(400).json({ message: 'Fruit name is required and must be a non-empty string for update', success: false });
    }

    const parsedFruit = fruit.trim().toLowerCase();

    const updateData = { name: parsedFruit };

    try {
        const existingFruitWithNewName = await db('tbl_fruits')
            .whereRaw('LOWER(name) = ?', [parsedFruit]) 
            .whereNot({ id: id }) 
            .first();

        if (existingFruitWithNewName) {
            return res.status(409).json({
                message: `Another fruit with the name '${parsedFruit}' already exists`,
                success: false
            });
        }

        const affectedRows = await db('tbl_fruits')
            .where({ id: id }) 
            .update(updateData); 

        if (affectedRows === 0) {

            const fruitExists = await db('tbl_fruits').where({id}).first();

             return res.status(fruitExists ? 200 : 404).json({
                 message: fruitExists ? 'Fruit updated successfully (no change detected).' : 'Fruit not found.',
                 success: fruitExists 
             });
        }

        const updatedFruit = await db('tbl_fruits').where({ id }).first(); 

        res.status(200).json({
            message: 'Fruit updated successfully',
            data: { fruit: updatedFruit },
            success: true
        });

    } catch (error) {
        console.error(`Error updating fruit ${id}:`, error);
        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('UNIQUE constraint')) {
           return res.status(409).json({ message: `Fruit name '${parsedFruit}' likely already exists (DB constraint).`, success: false });
        }
        res.status(500).json({ ...errorMessage, success: false });
    }
};

export const getFruitById = async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
    return res.status(400).json({
      message: 'Invalid ID format. ID must be a positive integer',
      success: false
    });
  }

  try {
    const fruit = await db('tbl_fruits').where({ id }).select('id', 'name', 'createdBy').first();
    if (!fruit) {
      return res.status(404).json({ ...notFoundMessage, success: false });
    }
    res.status(200).json({
      message: 'Fruit retrieved successfully',
      data: { fruit },
      success: true
    });
  } catch (error) {
    console.error(`Error fetching fruit with id ${id}:`, error);
    res.status(500).json({ ...errorMessage, success: false });
  }
};

export const deleteFruit = async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id) || parseInt(id, 10) <= 0) {
    return res.status(400).json({
      message: 'Invalid ID format. ID must be a positive integer',
      success: false
    });
  }

  try {
    const affectedRows = await db('tbl_fruits').where({ id }).del();
    if (!affectedRows) {
      return res.status(404).json({ ...notFoundMessage, success: false });
    }
    res.status(200).json({
      message: `Fruit with id ${id} deleted successfully`,
      success: true
    });
  } catch (error) {
    console.error(`Error deleting fruit with id ${id}:`, error);
    res.status(500).json({ ...errorMessage, success: false });
  }
};

/* Previous coding using mysql2
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
};*/