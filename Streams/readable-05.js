const fs = require('fs')
const readable = fs.createReadStream('example.txt', { highWaterMark: 20 })

readable.on('data', chunk => {
  console.log(`Read ${chunk.length} bytes`);
  console.log(chunk.toString());
  console.log();
})