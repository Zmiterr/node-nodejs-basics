import { promises as fs } from 'fs';
import path from 'path';

const write = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToWrite.txt');

    const writableStream = fs.createWriteStream(filePath);

    try {
        process.stdin.pipe(writableStream);
    } catch {
        throw new Error('FS operation failed');
    }
};

await write();
