const { Buffer } = require('node:buffer');

// Creates a zero-filled Buffer of length 10.
const buf1 = Buffer.alloc(10);
console.log("🚀 ~ file: ex02.js ~ line 5 ~ buf1", buf1)


// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf2 = Buffer.alloc(10, 1);
console.log("🚀 ~ file: ex02.js ~ line 10 ~ buf2", buf2)


// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's
// contents.
const buf3 = Buffer.allocUnsafe(10);
console.log("🚀 ~ file: ex02.js ~ line 19 ~ buf3", buf3)


// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3, 40]); // Notice the values are converted to HEX, so 40 -> 28
console.log("🚀 ~ file: ex02.js ~ line 25 ~ buf4", buf4)


// Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
// are all truncated using `(value & 255)` to fit into the range 0–255.
const buf5 = Buffer.from([257, 257.5, -255, '1']);
console.log("🚀 ~ file: ex02.js ~ line 31 ~ buf5", buf5)


// Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
// [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
// [116, 195, 169, 115, 116] (in decimal notation)
const buf6 = Buffer.from('tést');
console.log("🚀 ~ file: ex02.js ~ line 38 ~ buf6", buf6, buf6.toString())



// Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf7 = Buffer.from('tést', 'latin1');
console.log("🚀 ~ file: ex02.js ~ line 44 ~ buf7", buf7, buf7.toString(), buf7.toString('latin1'))
