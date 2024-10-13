const fs = require('fs');
const {Transform , pipeline} = require('stream');
const readableStream = fs.createReadStream('./data/first.txt', { highWaterMark:20 ,  encoding: 'utf-8'});
const writableStream = fs.createWriteStream('./data/bestway.txt');

const toUpperCase = new Transform({
    transform(chunk, encoding, callback){
        callback(null,chunk.toString().toUpperCase());
    }
});

pipeline(
    readableStream,
    toUpperCase,
    writableStream,
    (error)=>{
        if(error){
            console.log('error : ',error);
        }
    }
)