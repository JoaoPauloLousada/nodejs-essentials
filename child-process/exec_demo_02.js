const { execSync, exec } = require('child_process')
// node
const output1 = execSync(`node -e "console.log('subprocess output')"`)
console.log('output1:', output1.toString())


const output2 = execSync(
  `${process.execPath} -e "console.error('subprocess output')"`
)
console.log('output2:', output2.toString());


// platform
const cmd = process.platform === 'win32' ? 'dir' : 'ls'
const output3 = execSync(cmd)
console.log('output3:', output3.toString())


//exception
/* 
try {
  execSync(`${process.execPath} -e "process.exit(1)"`)
} catch (error) {
  console.error('CAUGHT ERROR:', error)
}

try {
  execSync(`${process.execPath} -e "throw Error('kaboom')"`)
} catch (error) {
  console.error('CAUGHT ERROR:', error)
} 
*/
/* 
exec(`${process.execPath} -e "console.log('A');console.error('B')"`,
  (err, stdout, stderr) => {
    console.log('err:', err)
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  })

exec(`${process.execPath} -e "console.log('A');throw Error('B')"`,
  (err, stdout, stderr) => {
    console.log('err:', err)
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  })

 */
// close
const sp = exec(`${process.execPath} -e "console.log('subprocess output')"`)
sp.stdout.pipe(process.stdout)
sp.on('close', status => {
  console.log('exit status was:', status)
})

