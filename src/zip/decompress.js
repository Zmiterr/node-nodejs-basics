import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const gunzip = createGunzip();
    const pipe = promisify(pipeline);

    const inputPath = path.join(__dirname, 'files', 'archive.gz');
    const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');

    try {
        const readStream = createReadStream(inputPath);
        const writeStream = createWriteStream(outputPath);

        await pipe(readStream, gunzip, writeStream);
        console.log('File decompressed successfully');

    } catch (error) {
        console.error('Decompression process failed:', error);
    }
};

await decompress();
