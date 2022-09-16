const { stdout } = require('process')
const { Readable } = require('stream')


let c = 97
const rs = Readable()


rs._read = function () {
  if (c >= 'z'.charCodeAt(0)) rs.push(null)

  setTimeout(() => {
    rs.push(String.fromCharCode(c++))
  }, 50)
}


rs.pipe(stdout)

process.on('exit', () => {
  console.error('\n_read() called ' + (c - 97) + ' times')
})

stdout.on('error', process.exit)