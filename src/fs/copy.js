import { promises as fs } from 'fs';
import path from 'path';
import { __dirname } from "./pathUtils.js";

const copy = async () => {

    const source = path.join(__dirname, 'files');
    const destination = path.join(__dirname, 'files_copy');

    try {
        await fs.access(source);
        await fs.access(destination);
        throw new Error('FS operation failed');
    } catch {
        try {
            await fs.cp(source, destination, { recursive: true });
        } catch {
            throw new Error('FS operation failed');
        }
    }
};

await copy();
