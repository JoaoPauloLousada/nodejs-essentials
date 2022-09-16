import { pipeline, Readable, Transform, Writable } from 'node:stream'
import { promisify } from 'node:util'
import { createWriteStream } from 'fs'
const pipelineAsync = promisify(pipeline)

{
  const readableStream = Readable({
    read: function () {
      this.push('Hello world 0')
      this.push('Hello world 1')
      this.push('Hello world 2')
      this.push(null)
    }
  })

  const writableStream = Writable({
    write(chunk, encoding, callback) {
      console.log('msg', chunk.toString())
      callback()
    }
  })

  await pipelineAsync(
    readableStream,
    // process.stdout
    writableStream
  )
}

console.log('process 01 has ended');

{
  const readableStream = Readable({
    read() {
      for (let i = 0; i < 1e5; i++) {
        const person = { id: Date.now() + i, name: 'John doe-' + i }
        const data = JSON.stringify(person)
        this.push(data)
      }

      this.push(null) // ends streaming
    }
  })

  const writableStream = Transform({
    transform(chunk, encoding, callback) {
      const data = JSON.parse(chunk)
      const result = `${data.id},${data.name.toUpperCase()}\n`
      callback(null, result)
    }
  })

  const setHeader = Transform({
    transform(chunk, encoding, callback) {
      this.counter = this.counter ?? 0
      if (this.counter) return callback(null, chunk)
      this.counter += 1

      callback(null, "id,name\n".concat(chunk))
    }
  })

  await pipelineAsync(
    readableStream,
    writableStream,
    setHeader,
    // process.stdout
    createWriteStream('my.csv')
  )
}