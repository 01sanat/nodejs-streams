# Streams in Node.js

## Overview
This project demonstrates the use of streams in Node.js, specifically focusing on readable, writable, and duplex streams. Streams are essential when working with large files that cannot be loaded into memory all at once.

### What are Streams?
Streams are a powerful way to handle data in Node.js, allowing you to read and write data in chunks rather than all at once. This is particularly useful for processing large files or data sources.

### High Water Mark

- **High Water Mark**: Determines the chunk size in bytes.
- **Options**:
  - **start**: Position (in bytes) where the stream begins reading (0-based).
  - **end**: Position (in bytes) where the stream stops reading (inclusive).
  - **encoding**: Specifies how binary data should be interpreted. If not set, raw binary data is returned in Buffer objects.

### Note on Binary Data
For non-text binary data (like images), it's better to leave the stream as raw Buffer objects to avoid data corruption.

### Understanding Backpressure in Node.js Streams
Backpressure occurs in streams when the readable stream is producing data faster than the writable stream can consume it. This can lead to memory issues and potential data loss if not managed correctly

-- **Events and Backpressure**: 
```javascript
const fs = require('fs');

const readable = fs.createReadStream('./data/input.txt');
const writable = fs.createWriteStream('./data/output.txt');

// Using standard event listeners
readable.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length);
    writable.write(chunk); // Potentially causes backpressure
}); 
```

-- **Pipes and Backpressure** :
  The pipe() method handles backpressure automatically. When you pipe a readable stream to a writable stream, Node.js manages the flow of data. If the writable stream's internal buffer is full, the readable stream will pause until there is space available in the buffer.

  ```javascript 
  const fs = require('fs');

const readable = fs.createReadStream('./data/input.txt');
const writable = fs.createWriteStream('./data/output.txt');

// Using pipe method
readable.pipe(writable);
```


