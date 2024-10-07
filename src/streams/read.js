import { promises as fs } from 'fs';
import path from 'path';

const read = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToRead.txt');

    try {
        const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        readableStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
        readableStream.on('error', () => {
            throw new Error('FS operation failed');
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
