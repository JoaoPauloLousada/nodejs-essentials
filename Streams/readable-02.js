const { stdout } = require('process')
const { Readable } = require('stream')


let c = 97
const rs = Readable()


rs._read = function () {
  rs.push(String.fromCharCode(c++))
  if (c > 'z'.charCodeAt(0)) rs.push(null)
}


rs.pipe(stdout)