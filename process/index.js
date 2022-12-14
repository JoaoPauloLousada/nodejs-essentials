// Architecture

// possible values: 'arm', 'arm64', 'ia32', 'mips','mipsel', 'ppc', 
// 'ppc64', 's390', 's390x', 'x32', 'x64'.
console.log('Architecture', process.arch)


// Platform
// possible values: 'aix', 'darwin', 'freebsd', 'linux', 
// 'openbsd', 'sunos', 'win32'
console.log('platform', process.platform)


// Arguments

// node .
console.log('argv', process.argv)

// zsh -c "exec -a test node ."
console.log('argv0', process.argv0)


// Directory
console.log('process.cwd()', process.cwd())
process.chdir('../')
console.log('process.cwd()', process.cwd())
process.chdir('./process')
console.log('process.cwd()', process.cwd())


// Memory
const {
  rss, // Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code. 
  heapTotal, // total V8's memory.
  heapUsed, // V8's memory usage.
  external, // memory usage of C++ objects bound to JavaScript objects managed by V8
  arrayBuffers // memory allocated for ArrayBuffers and SharedArrayBuffers, including all Node.js Buffers. This is also included in the external value
} = process.memoryUsage()
console.log('rss', rss)
console.log('heapTotal', heapTotal)
console.log('heapUsed', heapUsed)
console.log('external', external)
console.log('arrayBuffers', arrayBuffers)


// Uptime
console.log('uptime', process.uptime())


// Environment
console.log(process.env)


// Execution path
console.log(process.execPath)