import { promises as fs } from 'fs';
import path from 'path';
import { __dirname } from "./pathUtils.js";

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    try {
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch {
        await fs.writeFile(filePath, 'I am fresh and young');
    }
};

await create();
