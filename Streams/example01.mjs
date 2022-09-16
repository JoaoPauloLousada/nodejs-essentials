// process.stdin.pipe(process.stdout)
// .on('data', msg => console.log('msg:', msg.toString()))
// .on('error')
// .on('end')
// .on('close')



// gerar arquivo de 1gb para ser processado via streams
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
import http from 'node:http'
import { readFileSync, createReadStream } from 'fs'
http.createServer((req, res) => {
  createReadStream("big.file")
    .pipe(res)
}).listen(3000, () => console.log('running at 3000'))

// make curl localhost:3000 --output bigFile.txt