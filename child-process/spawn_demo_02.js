const { spawnSync, spawn } = require('child_process')

const result1 = spawnSync(
  process.execPath,
  ['-e', `console.log('subprocess output')`]
)
console.log('result1:', result1, result1.stdout.toString())


// exception
const result2 = spawnSync(process.execPath, ['-e', `process.exit(1)`])
console.log('result2', result2) // status 1


// close
const sp1 = spawn(
  process.execPath,
  ['-e', `console.log('subprocess sp1 output')`]
)
console.log('pid sp1 is', sp1.pid)
sp1.stdout.pipe(process.stdout)

// const sp2 = spawn(process.execPath, ['-e', `process.exit(1)`])
const sp2 = spawn(process.execPath, ['-e', `throw Error('error')`])
console.log('pid sp2 is', sp2.pid)
sp2.stderr.pipe(process.stdout)

sp2.on('close', status => {
  console.log('exit status sp2 was:', status)
})