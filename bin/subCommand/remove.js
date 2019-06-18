const fs = require('fs')
const path = require('path')

function cmdAction(cmd) {
    const resp = fs.readFileSync(path.join(__dirname, '../setting.json'), 'utf8')
    const data = JSON.parse(resp)
    
}

module.exports = (program) => {
    program
        .command('remove')
        .description('删除指定仓库的webhook')
        .action(cmd => cmdAction(cmd))
}