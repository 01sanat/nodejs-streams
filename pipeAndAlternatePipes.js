// The most common use case of piping is reading data from a readable stream and writing it to a writable stream without needing to store the entire data in memory.

// Benefits of Using Pipe:
// Memory efficiency: Data is transferred piece by piece, not loading the entire content into memory.
// Chaining: You can pipe multiple streams together to create complex data flows (e.g., reading a file, compressing it, and then writing it to another file).



// in Node.js, a Transform stream is a type of stream that can both read from a source and write to a destination, while transforming the data as it passes through. It is a type of duplex stream, meaning it implements both readable and writable stream interfaces, but with the added ability to manipulate or process the data in between reading and writing.

const fs = require('fs');
const zlib = require('zlib');
const readAndWriteByStreamsUsingPipes = () => {
    // read the file and on the fly write the data in another file , without storing it in memory

    const readStream = fs.createReadStream('./sample.txt');
    const writeStream = fs.createWriteStream('./outputUsingPipe.txt');
    
    readStream.pipe(writeStream);

}

readAndWriteByStreamsUsingPipes();


// read file , compress the chunk and then write the compressed data 
const createCompressedFile = () => {
    const readStream = fs.createReadStream('./sample.txt');
    const writeStream = fs.createWriteStream('./output.txt.gz')

      // transform stream from compression , it can cread and write both 
      const gzipStream = zlib.createGzip();

      readStream.pipe(gzipStream).pipe(writeStream);

}