# More On Streams

## Description 
`moreOnStreams.js` is a Node.js script that demonstrates how to compress and decompress files using streams and the built-in `zlib` module. This script utilizes the `pipeline` method from the `stream` module to handle file streaming, ensuring efficient data processing with proper error handling.

## Features
- Compress files using Gzip format.
- Decompress files that have been compressed with Gzip.
- Uses Node.js streams for efficient file handling.
- Includes error handling for both compression and decompression processes.

## Installation
1. Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone this repository to your local machine or download the `moreOnStreams.js` file.
3. Create a `data` directory in the project folder.
4. Place a text file named `first.txt` inside the `data` directory.
