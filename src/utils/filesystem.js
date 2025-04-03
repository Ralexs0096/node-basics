import fs from 'node:fs';

export const verifyIfFileExist = (filePath) => fs.existsSync(filePath);
