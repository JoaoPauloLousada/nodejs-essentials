import http from 'node:http'
import net from 'node:net'
import { readFileSync, createReadStream } from 'fs'
// http.createServer((req, res) => {
//   createReadStream("big.file")
//     .pipe(res)
// }).listen(3000, () => console.log('running at 3000'))

net.createServer(socket => socket.pipe(process.stdout))
  .listen(1338)

// connecting terminal to socket server
// node -e "process.stdin.pipe(require('net').connect(1338))"