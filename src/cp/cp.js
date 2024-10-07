import { spawn } from 'child_process';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'files','script.js');

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    child.stdout.on('data', (data) => {
        process.stdout.write(`Child stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        process.stderr.write(`Child stderr: ${data}`);
    });

    process.stdin.pipe(child.stdin);

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    child.send({ msg: 'Hello from parent process' });

    child.on('message', (message) => {
        console.log('Message from child:', message);
    });
};

spawnChildProcess(  ['someArgument1', 'someArgument2']);
