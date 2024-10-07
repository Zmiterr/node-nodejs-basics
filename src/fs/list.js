import { promises as fs } from 'fs';
import path from 'path';
import { __dirname } from "./pathUtils.js";

const list = async () => {
    const dirPath = path.join(__dirname, 'files');

    try {
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();
