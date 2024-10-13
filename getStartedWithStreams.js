const fs = require('fs');
const { Transform } = require('stream');

// ====================
// Streams Overview
// ====================

// Streams are beneficial when working with large files that can't be read into memory all at once. 

// High Water Mark: Determines the chunk size in bytes.
// Options:
// - start: Position (in bytes) where the stream begins reading (0-based).
// - end: Position (in bytes) where the stream stops reading (inclusive).
// - encoding: Specifies how binary data should be interpreted. If not set, raw binary data is returned in Buffer objects.

// Note: For non-text binary data (like images), it's better to leave the stream as raw Buffer objects to avoid data corruption.

// ====================
// Readable Stream Example
// ====================

const readStream = fs.createReadStream('./data/first.txt', { highWaterMark: 20 });

let chunkCount = 0;

readStream.on('data', (buffer) => {
    if (chunkCount === 2) {
        // Pause the stream after receiving 2 chunks
        readStream.pause();
        setTimeout(() => {
            console.log('Resuming streams....');
            readStream.resume();
        }, 2000);
    }
    
    console.log('-- New Chunk:', buffer.toString());
    chunkCount++;
}).on('end', () => {
    console.log('Stream ended');
}).on('error', (err) => {
    console.log('Error =>', err);
});

// ====================
// Writable Stream Example
// ====================

const writeStream = fs.createWriteStream('./data/first-write.txt');

writeStream.write('Hello, it\'s me, Sanat\n');
writeStream.write('Bye, friends');
writeStream.end(); // Signal that no more data will be written to the stream

// ====================
// Duplex Stream Example (Transform Stream)
// ====================

const readable = fs.createReadStream('./data/first.txt');
const writable = fs.createWriteStream('./data/transformed-first.txt');

const transformToUpperCase = new Transform({
    transform(chunk, encoding, callback) {
        const transformedData = chunk.toString().toUpperCase();
        callback(null, transformedData);
    }
});

// Error handling for all streams
const handleError = (error) => {
    console.log('Error =>', error);
    readable.destroy();
    transformToUpperCase.destroy();
    writable.destroy();
};

// Attach error handlers
readable.on('error', handleError);
transformToUpperCase.on('error', handleError);
writable.on('error', handleError);

// Pipe the streams together
readable.pipe(transformToUpperCase).pipe(writable).on('finish', () => {
    console.log('File transformed and written successfully');
});

// ====================
// Memory Leak Prevention
// ====================

// Example of a possible memory leak:
// If a readable stream encounters an error but the pipeline doesn't stop, 
// unprocessed data might accumulate, increasing memory usage over time.
// Handling errors and destroying the streams prevents this issue.

// ====================
// Conclusion
// ====================

// Adding error handling in streams is crucial for the stability and performance of a Node.js application. 
// It ensures that resources are released properly and the application behaves predictably, even in the event of errors.
