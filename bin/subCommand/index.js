const list = require('./list')
const add = require('./add')

module.exports = (program) => {
    add(program)
    list(program)
}