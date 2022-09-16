const fs = require('fs')
const crypto = require('crypto')
const { pipeline } = require('stream')
const { stdout, stdin } = require('process')

// Non streaming
/* fs.readFile("../big.file", (readErr, data) => {
  if (readErr) return console.log(readErr);
  const hash = crypto.createHash("sha256").update(data).digest("base64");
  fs.writeFile("../checksum.txt", hash, (writeErr) => {
    writeErr && console.error(err);
  });
}); */


// Streaming
const hashStream = crypto.createHash('sha256')
hashStream.setEncoding('base64')


const inputStream = fs.createReadStream('../big.file')
const outputStream = fs.createWriteStream('../checksum.txt')


pipeline(inputStream, hashStream, outputStream, err => {
  if (err) console.error(err)
  else console.log('finished')
})

stdin.on('data', () => { })