const { promisify } = require('util')

const callback = (err, value) => {
  console.log('callback:', value)
}

const fn1 = (a, b, c, d, callback) => {
  console.log('fn1:', a, b, c, d)
  callback(null, 'value fn1')
}

fn1('a', 'b', 'c', 'd', callback)


const fn1Promise = promisify(fn1)
fn1Promise('a', 'b', 'c', 'd')
  .then(value => console.log('fn1Promise', value))
