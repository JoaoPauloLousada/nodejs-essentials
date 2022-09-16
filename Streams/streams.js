const { Writable, Readable, PassThrough, Transform, Duplex, pipeline } = require('stream');
const { createGunzip, createGzip } = require('zlib');

const chunks = ["one", "two", "three", "four", "five"];


// Writable
const createWritable = (decodeStrings = true) => {
  const result = []

  return new Writable({
    decodeStrings,
    write(chunk, encoding, callback) {
      result.push(chunk)
      callback()
    },
    final() {
      console.log(chunks, result);
    }
  })
}

const baseWritable1 = createWritable(decodeStrings = true)
chunks.forEach(item => baseWritable1.write(item))
baseWritable1.end()

const baseWritable2 = createWritable(decodeStrings = false)
chunks.forEach(item => baseWritable2.write(item))
baseWritable2.end()

const readableWritable = createWritable(decodeStrings = false)
const readableReadable = Readable.from(chunks)
readableReadable.pipe(readableWritable)


// Readable
const createReadable = (objectMode = false) => {
  const chunksCopy = chunks.slice(0)

  return new Readable({
    objectMode,
    read(size) {
      const interval = setInterval(() => {
        if (chunksCopy.length) {
          this.push(chunksCopy.shift())
        } else {
          this.push(null)
          clearInterval(interval)
        }
      }, 100)
    }
  })
}

const baseReadable1 = createReadable(objectMode = false)
baseReadable1.on('data', data => console.log(data))

const baseReadable2 = createReadable(objectMode = true)
baseReadable2.on('data', data => console.log(data))

const baseReadable3 = createReadable(objectMode = true)
const baseWritable4 = createWritable(decodeStrings = false)
baseReadable3.pipe(baseWritable4)


// PassThrough
const passThrough = new PassThrough()
const readablePass = createReadable(objectMode = true)
const writablePass = createWritable(decodeStrings = true)
readablePass.pipe(passThrough).pipe(writablePass)


// Transform
const createTransform = (objectMode = false) => new Transform({
  objectMode,
  transform(chunk, encoding, callback) {
    this.push(chunk.toUpperCase())
    callback()
  }
})

const readableTransform = createReadable(objectMode = true)
const writableTransform = createWritable(decodeStrings = false)
const baseTransform = createTransform(objectMode = true)
readableTransform.pipe(baseTransform).pipe(writableTransform)


// Duplex
const createDuplexStream = () => new Duplex({
  read(size) {
    ['A', 'B', 'C', 'D', 'E'].forEach(item => this.push(item))
    this.push(null)
  },
  write(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString()
    }
    console.log(chunk)
    callback()
  }
})

const baseDuplexStream = createDuplexStream()
const duplexReadable = createReadable(objectMode = true)
duplexReadable.pipe(baseDuplexStream).pipe(process.stdout)


// pipeline
const transformConsole = new Transform({
  transform(chunk, encoding, callback) {
    console.log(chunk.toString())
    this.push(chunk)
    callback()
  }
})

const zip = createGzip()
const unzip = createGunzip()
const pipelineRead = createReadable(objectMode = true)
pipeline(pipelineRead, zip, transformConsole, unzip, process.stdout, err => {
  if (err) console.log(err)
})