// test the application endpoints using loadtest
// loadtest -n 10 -c 10 http://localhost:3000/one

const express = require('express')
const { fork } = require('child_process')
const { longComputation } = require('./longComputation')

const app = express()

app.get('/one', (req, res) => {
  const sum = longComputation()
  res.send({ sum })
})


app.get('/two', async (req, res) => {
  const asyncComputation = () => new Promise(resolve => resolve(longComputation()))
  const sum = await asyncComputation()
  res.send({ sum })
})


app.get('/fork', (req, res) => {
  const child = fork('./longComputationForkProcess.js')
  child.send('start')
  child.on('message', sum => {
    res.send({ sum })
  })
})


app.listen(3000, () => {
  console.log('server running on port 3000');
})
