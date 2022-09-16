const { StringDecoder } = require("string_decoder");

// allocation
console.group('## allocation ##');

const unsageAlloc = Buffer.allocUnsafe(10);
console.log("🚀 ~ file: index.js ~ line 5 ~ unsageAlloc", unsageAlloc);

const safeAlloc = Buffer.alloc(10);
console.log("🚀 ~ file: index.js ~ line 8 ~ safeAlloc", safeAlloc)
console.groupEnd()

// encoding
console.group('## encoding ##');

const enc1 = Buffer.from('test')
console.log("deafult encoding", enc1)

const enc2 = Buffer.from('test', 'utf8')
console.log("utf8", enc2)

const enc3 = Buffer.from('test', 'utf16le')
console.log("utf16le", enc3)

const enc4 = Buffer.from('test', 'latin1')
console.log("latin1", enc4)

const enc5 = Buffer.from('dGVzdA==', 'base64')
console.log("base64", enc5.toString())

const enc6 = Buffer.from('74657374', 'hex')
console.log("hex", enc6.toString())

console.groupEnd()


// decoding
console.group('## decoding ##')

console.log('enc2', enc2.toString())
console.log('enc2 base64', enc2.toString('base64'))
console.log('enc2 hex', enc2.toString('hex'))

console.groupEnd()


// construction
console.group('## construction ##')

const c1 = Buffer.from([50, 51, 52, 53, 54, 55, 56, 57])
console.log('array', c1, c1.toString())

const c2 = Buffer.from([50, 51, 52, 53, 54, 55, 56, 57], 'ASCII')
console.log('ASCII', c2, c2.toString())

const c3 = Buffer.from(c1)
console.log('buffer', c3.toString())

const c4 = Buffer.from('😐︎')
console.log('c4 as buffer', c4);
console.log('c4.toString()', c4.toString());
console.log('c4 casting into string', c4 + '');
console.log('c4.length', c4.length);

console.groupEnd()


// decoder
console.group('## decoder ##')

const centPart1 = Buffer.from(['0xC2'])
const centPart2 = Buffer.from(['0xA2'])
console.log("Buffer.from(['0xC2'])", centPart1.toString());
console.log("Buffer.from(['0xA2'])", centPart2.toString());

const decoder = new StringDecoder()
console.log('decoder.write(centPart1)', decoder.write(centPart1));
console.log('decoder.write(centPart2)', decoder.write(centPart2));

console.groupEnd()


// JSON
console.group('## JSON ##')

const cent = Buffer.from(['0xC2', '0xA2'])
const json = JSON.stringify(cent)
const jsonBack = JSON.parse(json)
console.log('json', json)
console.log('buffer from json', Buffer.from(jsonBack.data))

console.groupEnd()


// slicing
console.group('## Slicing ##')

const sl1 = Buffer.from(['0xC2', '0xA2'])
const sl2 = sl1.slice(0, 1)
console.log('sl2', sl2);

console.groupEnd()