const express = require('express');
const fs = require('fs');
const app = express();
const zlib = require('zlib'); // To compress the file
const { pipeline } = require('stream');

// The response object is a writable stream. You can use the write method to send a response back to the client in chunks.
app.get('/', (req, res) => {
    res.send('Welcome to download file')
})
app.get('/download-file', async (req, res) => {

    // First approach

    // res.download(__dirname + '/data/bestway.txt', (err) => {
    //     if (err) {
    //         console.log('error', err);
    //     }
    //     res.end();
    // });

    // 2nd approach 
    //  browser’s default behavior might be to display the text, but by specifying headers like Content-Disposition, you force it to download the file instead. 
    const filePath = __dirname + '/data/bestway.txt';
    const stats = fs.statSync(filePath);
    const gzip = zlib.createGzip();

    // Set headers without Content-Length since we don't know compressed size in advance
    //     iff you want to include the Content-Length, you'll need to pre-compress the file and then serve the compressed version:
    //  Compress the file beforehand.
    // Serve the pre-compressed file.

    res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename= bestway.txt.gz",
        "content-length": stats.size,
        "content-encoding": gzip // Indicates that the content is Gzip-compressed
    })
    const readStream = fs.createReadStream(__dirname + '/data/bestway.txt');

    // readStream.pipe(gzip).pipe(res);
    pipeline(
        readStream,
        gzip,
        res,
        (err) => {
            if (err) {
                console.log('Pipeline failed: ', err);
                res.status(500).send('File Download failed');
            } else {
                console.log('Pipeline succeeded');
            }
        }
    )

})

console.log(__dirname);

app.listen(5050, () => {
    console.log(`Server started on port 5050 `)
})

// NOTES

// Useful Headers for File Downloads:

// 1.Content-Type:

// This header tells the browser the MIME type of the content you're sending. It helps the browser understand how to handle the file.

// Examples:

// Text file: "Content-Type": "text/plain"
// JSON file: "Content-Type": "application/json"
// PDF file: "Content-Type": "application/pdf"
// Binary file: "Content-Type": "application/octet-stream"


//2. Content-Disposition:

// This header specifies whether the content should be displayed inline in the browser or treated as an attachment (to be downloaded).
// To trigger a download, set it to attachment; filename="yourfile.txt". You can specify the file name to be used during the download.


// 3. Content-Length:

// Specifies the size of the file (in bytes). While it's optional, some clients may use this information for progress tracking or download management.
// You can get the file size using fs.statSync().

// 4. The Content-Encoding header is used to specify the type of encoding or compression applied to the body of the response, so that the browser knows how to decode or decompress it when the content is received. 