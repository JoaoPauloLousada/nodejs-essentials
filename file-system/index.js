const { readFileSync, promises, createReadStream, createWriteStream, readdirSync, watchFile } = require('fs')
const { unlink, readdir, stat } = require('fs/promises')
const path = require('path')
const { pipeline, Transform, Readable, EventEmitter } = require('stream')
const { promisify } = require('util')
const { readFile } = promises

// read file contents
const data = readFileSync(__filename, { encoding: 'utf8' })
// console.log(data);

readFile(__filename, { encoding: 'utf8' })
// .then(console.log)



// stream
createReadStream(__filename, { encoding: 'utf8' })
// .pipe(process.stdout)

const copyFilePath = path.resolve(__dirname, 'index.txt')
const copyFileUppercasePath = path.resolve(__dirname, 'index-uppercase.txt')

const pipelinePromise = promisify(pipeline)
pipelinePromise(
  createReadStream(__filename, { encoding: 'utf8' }),
  createWriteStream(copyFilePath)
)
  .then(() => unlink(copyFilePath))
  .catch(console.log)

const transform = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase())
  }
})

pipelinePromise(
  createReadStream(__filename, { encoding: 'utf8' }),
  transform,
  createWriteStream(copyFileUppercasePath)
)
  .then(() => unlink(copyFileUppercasePath))
  .catch(console.log)


// directories
try {
  const items = readdirSync(__dirname)
  console.log(items);
} catch (error) {
  console.error(error)
}

readdir(__dirname).then(console.log)

const transformToJSON = () => {
  let suffix = '\n'

  const result = new Transform({
    writableObjectMode: true,
    readableObjectMode: false,
    transform(entry, encoding, next) {
      if (entry == '[') {
        next(null, `${entry}`)
        return
      }
      next(null, `${suffix}"${entry}"`)
      suffix = ',\n'
    },
    final() {
      this.push('\n]\n')
    }
  })

  result.write('[')

  return result
}

const dirJson = path.resolve(__dirname, 'dir.json')
pipelinePromise(
  Readable.from(readdirSync(__dirname)),
  transformToJSON(),
  createWriteStream(dirJson)
)
  .then(() => unlink(dirJson))
  .catch(console.log)



// File stats

// atime "Access Time": Time when file data last accesssed.
// Changed by the mknow(2), utimes(2), read(2) system calls

// mtime "Modified Time": Time when file data last modified.
// Change by the mknod(2), utimes(2), write(2) system calls

// ctime "Changed Time": Time when fle status was last changes (inode data modification).
// Changed by the chmod(2), chown(2), link(2), mknod(2), rename(2), unlink(2), 
// utimes(2), read(2), write(2) system calls.
/* 
readdir(__dirname)
  .then(data => Promise.all(data.map(item => stat(item))))
  .then(data => {
    data.forEach((item, index) => {
      const { atime, birthtime, ctime, mtime } = item
      console.group(
        item.isDirectory() ? 'dir' : item.isFile() ? 'file' : 'unknown',
        item
      )
      console.log('atime:', atime.toLocaleString())
      console.log('ctime:', ctime.toLocaleString())
      console.log('mtime:', mtime.toLocaleString())
      console.log('birthtime:', birthtime.toLocaleString())
      console.groupEnd()
      console.log()
    })
  })
  .catch(console.log)
 */

// path
console.log('file name:', __filename)
console.log('Directory name:', path.dirname(__filename))
console.log('Base name:', path.basename(__filename))
console.log('Extension name:', path.extname(__filename))
console.log('Resolve:', path.resolve(__dirname, 'test', 'test.txt'))
console.log('Normalize:', path.normalize(`${__dirname}/../../test/test.txt`))
console.log('Is absolute:', path.isAbsolute(__filename))
console.log('Is absolute:', path.isAbsolute('./index.js'))


// watching
const fileWatchingEvents = new EventEmitter()

watchFile(path.resolve(__dirname, 'watch-file.txt'), (curr, prev) => {
  try {
    if (curr.ctimeMs !== prev.ctimeMs) {
      fileWatchingEvents.emit('status-updated', { curr, prev })
    }

    if (curr.mtimeMs !== prev.mtimeMs) {
      fileWatchingEvents.emit('content-updated', { curr, prev })
    }

    if (curr.atimeMs !== prev.atimeMs) {
      fileWatchingEvents.emit('access-updated', { curr, prev })
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      fileWatchingEvents.emit('deleted', __filename)
    } else {
      fileWatchingEvents.emit('error', error)
    }
  }
})

fileWatchingEvents.on('access-updated', () => console.log('access-updated'))
fileWatchingEvents.on('content-updated', () => console.log('content-updated'))
fileWatchingEvents.on('status-updated', () => console.log('status-updated'))
fileWatchingEvents.on('deleted', () => console.log('deleted'))
fileWatchingEvents.on('error', () => console.log('error'))