const fs = require('fs')
const readable = fs.createReadStream('example.txt', { highWaterMark: 20 })


async function read() {
  for await (const chunk of readable) {
    console.log(`Read ${chunk.length} bytes`);
    console.log(chunk.toString());
    console.log();
  }
}

read()