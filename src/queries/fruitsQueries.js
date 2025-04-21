
export const getAllFruitsQuery = 'SELECT * FROM tbl_fruits';
export const getFruitByIdQuery = 'SELECT * FROM tbl_fruits WHERE id = ?';
export const createFruitQuery = 'INSERT INTO tbl_fruits (name, createdBy) VALUES (?, ?)';
export const deleteFruitByIdQuery = 'DELETE FROM tbl_fruits WHERE id = ?';