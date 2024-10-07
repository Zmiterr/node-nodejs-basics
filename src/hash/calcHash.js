import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const calculateHash = async () => {
    const filePath = path.join(process.cwd(), 'files', 'fileToCalculateHashFor.txt');

    try {
        await fs.promises.access(filePath);

        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => {
            console.log(hash.digest('hex'));
        });

        stream.on('error', (error) => {
            console.error('FS operation failed:', error);
        });
    } catch (error) {
        console.error('FS operation failed:', error);
    }
};

await calculateHash(); // Вызов функции
