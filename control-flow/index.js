const { promisify } = require('util')

const f = (value, interval) => callback => {
  setTimeout(() => {
    callback(null, value)
  }, interval)
}

const f1 = f('f1', 100)
const f2 = f('f2', 300)
const f3 = f('f3', 500)

const printCallback = (_, value) => console.log(value)


// callback based
f1(printCallback)
f2(printCallback)
f3(printCallback)


// sequencial
f1((_, value) => {
  printCallback(_, value)
  f2((_, value2) => {
    printCallback(_, value2)
    f3(printCallback)
  })
})


// sequencial promise
const f1Promise = promisify(f1)
const f2Promise = promisify(f2)
const f3Promise = promisify(f3)
const promiseCallback = (_, value) => console.log('promise:', value)

f1Promise()
  .then(data => promiseCallback(null, data))
  .then(() => f2Promise())
  .then(data => promiseCallback(null, data))
  .then(() => f3Promise())
  .then(data => promiseCallback(null, data))
  .catch(console.log)


// sequential dynamic promises
const promisesArray = [f1Promise, f2Promise, f3Promise]
promisesArray.reduce((acc, curr) => {
  return acc
    .then(() => curr())
    .then(data => promiseCallback(null, data))
}, Promise.resolve())
  .catch(console.log)


// parallel promise
const promises = [
  f1Promise().then(data => promiseCallback(null, data)),
  f2Promise().then(data => promiseCallback(null, data)),
  f3Promise().then(data => promiseCallback(null, data))
]

Promise.all(promises)
  .catch(console.log)