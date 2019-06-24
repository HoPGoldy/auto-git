const list = require('./list')
const add = require('./add')
const remove = require('./remove')
const start = require('./start')
const config = require('./config')

module.exports = (program) => {
    add(program)
    list(program)
    remove(program)
    start(program)
    config(program)
}