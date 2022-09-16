const { Buffer } = require('node:buffer');

/* 
  Buffer instances are also JavaScript Uint8Array and TypedArray instances. 
  All TypedArray methods are available on Buffers. There are, however, subtle incompatibilities between the Buffer API and the TypedArray API.

  While TypedArray.prototype.slice() creates a copy of part of the TypedArray, Buffer.prototype.slice() creates a view over the existing Buffer without copying. This behavior can be surprising, and only exists for legacy compatibility. TypedArray.prototype.subarray() can be used to achieve the behavior of Buffer.prototype.slice() on both Buffers and other TypedArrays and should be preferred.
  buf.toString() is incompatible with its TypedArray equivalent.
  A number of methods, e.g. buf.indexOf(), support additional arguments.
*/


// There are two ways to create new TypedArray instances from a Buffer:


// Passing a Buffer to a TypedArray constructor will copy the Buffers contents, 
// interpreted as an array of integers, and not as a byte sequence of the target type.

const buf = Buffer.from([1, 2, 3, 40]);
console.log("🚀 ~ file: Buffer_TypedArrays.js ~ line 20 ~ buf", buf)
const uint32array = new Uint32Array(buf);
console.log("🚀 ~ file: Buffer_TypedArrays.js ~ line 22 ~ uint32array", uint32array)


// Passing the Buffers underlying ArrayBuffer will create a TypedArray that shares its memory with the Buffer.
const buf2 = Buffer.from('hello', 'utf16le');
console.log("🚀 ~ file: Buffer_TypedArrays.js ~ line 27 ~ buf2", buf2)
const uint16array = new Uint16Array(
  buf2.buffer,
  buf2.byteOffset,
  buf2.length / Uint16Array.BYTES_PER_ELEMENT);
console.log("🚀 ~ file: Buffer_TypedArrays.js ~ line 32 ~ uint16array", uint16array)
buf2[0] = 69 // mutating buf2 should reflect on uint16array
console.log("🚀 ~ file: Buffer_TypedArrays.js ~ line 33 ~ buf2", buf2)
console.log("🚀 ~ file: Buffer_TypedArrays.js ~ line 32 ~ uint16array", uint16array)
