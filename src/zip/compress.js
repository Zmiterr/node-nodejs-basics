import { createReadStream, createWriteStream} from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import {promisify} from 'node:util'
import { pipeline } from'node:stream'
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const gzip = createGzip();
    const pipe = promisify(pipeline);


    const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destinationPath = path.join(__dirname, 'files', 'archive.gz');

    try {
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(destinationPath);

        await pipe(readStream, gzip, writeStream)
        console.log('File compressed successfully')
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        throw new Error('Compression failed');
    }
};

await compress();
