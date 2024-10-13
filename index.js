const express = require('express')
const fs = require('fs');
const status = require('express-status-monitor');
const {pipeline} = require('node:stream/promises')
const zlib = require('node:zlib');
const { error } = require('console');
const app = express()
const port = 3000

app.use(status());
app.get('/',async  (req, res) => {
// fs.readFile('./sample.txt', (err,data)=>{
//     res.end(data)
// }
// )

const stream = fs.createReadStream('./sample.txt');

stream.on('data', (chunk)=>{
  res.write(chunk);
})

stream.on('end', ()=> res.end())

// await pipeline(
//   fs.createReadStream('./sample.txt'),
//   zlib.createGzip(),
//   fs.createWriteStream('sample.txt.gz')
// )

})

const readFileAndSendResponseInStreamingManner =  ()=>{
  const rstream = fs.createReadStream('./sample.txt');
   
  // create stream fires event = data , 
  rstream.on('data', (chunk)=>{
    res.write(data);ß
  })

  rstream.on('end', ()=> res.end());

  rstream.on('error', (err)=>{
    console.log(err);
    res.end("file not found");
  })
}




const readDataAndThenWrite = () => {
  const rStream = fs.createReadStream('./sample.txt');
  const wStream = fs.createWriteStream('./output.txt');

  rStream.pipe(wStream);
}

readDataAndThenWrite();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})