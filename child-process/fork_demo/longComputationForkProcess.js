const { longComputation } = require("./longComputation");

process.on('message', msg => {
  if (msg === 'start') {
    const sum = longComputation()
    process.send(sum)
  }
})