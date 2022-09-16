const { stdout } = require('process')
const { Readable } = require('stream')

const rs = new Readable
rs.push('beep ')
rs.push('boop\n')
rs.push(null)


rs.pipe(stdout)