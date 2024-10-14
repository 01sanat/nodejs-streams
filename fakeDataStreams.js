const fs = require('fs');
const csv = require('csvtojson');
const { Transform, pipeline } = require('stream');

const main = async () => {
    const readStream = fs.createReadStream('./data/import.csv');
    const writeStream = fs.createWriteStream('./data/export.ndjson');


    const myTransform = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const user = {
                name: chunk.name,
                email: chunk.email,
                age: Number(chunk.age),
                salary: Number(chunk.salary),
                isActive: chunk.isActive === 'true'
            }
            callback(null, user);
        }
    })

    const myFilter = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            if (!chunk.isActive) {
                callback(null);
                return;
            }
            console.log('-myfileter---', chunk);
            callback(null, chunk);
        }
    })

    // NDJSON (Newline Delimited JSON) is a format for encoding a stream of individual JSON objects separated by newlines. Each line in an NDJSON file contains one valid JSON object, and newlines (\n) are used to delimit these objects. This format is commonly used when dealing with streaming data, logs, or large datasets that are processed line-by-line.

    const convertToNdJson = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const value = JSON.stringify(chunk) + '\n';
            callback(null, value);
        }
    })

    // we can only pass buffer or string to writable stream , so we are converting our chunk back to string in convertToNdJson transformer
    try {
        await pipeline(readStream, csv({ delimiter: ';' }, { objectMode: true }), myTransform, myFilter, convertToNdJson, writeStream, (err) => {
            if (err) {
                console.error('Pipeline failed.', err);
            } else {
                console.log('Pipeline succeeded.');
            }
        });
        console.log('stream ended');

    } catch (error) {
        console.log('error>>>>', error);
    }
}

main();

