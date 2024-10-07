import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { __dirname } from './pathUtils.js'

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log(content);
    } catch (error) {
        console.error('FS operation failed');
    }
};

await read();
