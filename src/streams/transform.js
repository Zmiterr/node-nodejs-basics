const { Transform } = require('stream');

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const reversedChunk = chunk.toString().split('').reverse().join('');
            callback(null, reversedChunk);
        }
    });

    try {
        process.stdin.pipe(reverseStream).pipe(process.stdout);
    } catch {
        throw new Error('Transform operation failed');
    }
};

await transform();
