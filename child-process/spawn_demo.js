const { spawn } = require('child_process')
const { pipeline } = require('stream')

// const child = spawn('find', ['/'])
const child = spawn('ls', ['-lh'])

// child.stdout.on('data', data => {
//   console.log('stdout:', data.toString())
// })
// child.stdout.pipe(process.stdout)
pipeline(child.stdout, process.stdout, err => {
  if (err) console.log('err:', err)
})

child.stderr.on('data', data => {
  console.log('stderr:', data)
})

child.on('error', (err) => {
  console.log('error:', err)
})

child.on('exit', (code, signal) => {
  if (code) console.log('Process exit with code:', code)
  if (signal) console.log('Process killed with signal:', signal)
  console.log('Done ✅')
})

