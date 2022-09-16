const add = (a, b) => a + b

module.exports.add = add
module.exports.name = 'Test'
// module.exports = add
// console.log(module)
console.log('is functions.js main:', require.main === module)