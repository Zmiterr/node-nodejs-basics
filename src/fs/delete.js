import { promises as fs } from 'fs';
import path from 'path';
import { __dirname } from "./pathUtils.js";

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
