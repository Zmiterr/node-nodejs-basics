import {Worker} from 'worker_threads';
import path from 'path';
import os from 'os';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numberOfCores = os.cpus().length;
    const workers = [];
    const results = [];

    for (let i = 0; i < numberOfCores; i++) {
        const worker = new Worker(path.join(__dirname, 'worker.js'));
        workers.push(worker);

        const n = 10 + i;

        const promise = new Promise((resolve) => {
            worker.on('message', (result) => {
                results[i] = result;
                resolve();
            });
            worker.on('error', () => {
                results[i] = { status: 'error', data: null };
                resolve();
            });
        });

        worker.postMessage(n);
        await promise;
    }

    console.log(results);
};

await performCalculations();
