
const fs = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

// zlib comes with node for compression / decompression

// zlib.createGzip() : =>  use to compress data 

// zlib.createGunzip() : => decompress data that has been compressed using zlib.createGzip()

// Compatibility: Always use createGunzip() to decompress data that has been compressed using createGzip(). They are designed to work together using the Gzip format.
// Error Handling: If you attempt to decompress data that was not compressed with createGzip(), you may encounter errors or corrupted output.


const compressFile = () => {
    const readableStream = fs.createReadStream('./data/first.txt', { highWaterMark: 20, encoding: 'utf-8' });
    const writableStream = fs.createWriteStream('./data/bestway.txt.gz');

    pipeline(
        readableStream,
        zlib.createGzip(),
        writableStream,
        (error) => {
            if (error) {
                console.log("Compression error: ", error);
            } else {
                console.log("File compressed successfully!");

                // Start the decompression after successful compression
                decompressFile();
            }
        }
    );
};

// compressFile();

const decompressFile = () => {
    const readCompressedStream = fs.createReadStream('./data/bestway.txt.gz');  // Compressed file 
    const writableStream = fs.createWriteStream('./data/decompressed-bestway.txt'); // Destination for decompressed  

    pipeline(
        readCompressedStream,
        zlib.createGunzip(),
        writableStream,
        (error) => {
            if (error) {
                console.log("Decompression error: ", error);
            } else {
                console.log("File decompressed successfully!");
            }
        }
    );
};

// decompressFile();