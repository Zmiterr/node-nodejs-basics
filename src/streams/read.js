import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        readableStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
        readableStream.on('error', () => {
            throw new Error('FS operation failed1');
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
