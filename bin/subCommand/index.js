const list = require('./list')
const add = require('./add')
const remove = require('./remove')

module.exports = (program) => {
    add(program)
    list(program)
    remove(program)
}