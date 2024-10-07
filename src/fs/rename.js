import { promises as fs } from 'fs';
import path from 'path';
import { __dirname } from "./pathUtils.js";

const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');

    try {
        await fs.access(oldPath);
        await fs.access(newPath);
    } catch {
        try {
            await fs.rename(oldPath, newPath);
        } catch {
            throw new Error('FS operation failed');
        }
    }
};

await rename();
