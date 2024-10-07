import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { promisify } from "node:util";
import { pipeline } from "node:stream";

const decompress = async () => {
    const gunzip = createGunzip();
    const pipe = promisify(pipeline);

    const inputPath = path.join(process.cwd(), 'files', 'archive.gz');
    const outputPath = path.join(process.cwd(), 'files', 'fileToCompress2.txt');

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
