// Buffer objects are used to represent a fixed-length sequence of bytes. Many Node.js APIs support Buffers.
const { Buffer } = require('node:buffer')


const buff = Buffer.alloc(8)
// console.log(buff)

// buff.write("s", "utf-8")
buff.write("st", "utf-8")

// console.log(buff)
// console.log(buff.toJSON())
// console.log(buff.length)
// console.log(buff[0])


const buff2 = Buffer.from("string", "utf-8")
console.log(buff2);
console.log(buff2.toJSON());
console.log(buff2.toString());