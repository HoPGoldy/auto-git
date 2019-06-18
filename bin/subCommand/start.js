const spawn = require('child_process').spawn
const path = require('path')

function cmdAction(cmd) {
    const startFile = path.join(__dirname, '../../start.js')
    const cmdProcess = spawn('node', [ startFile ], {
        cwd: path.dirname(startFile)
    })

    cmdProcess.stdout.on('data', (data) => {
        console.log(`${data}`)
    })
    
    cmdProcess.stderr.on('data', (data) => {
        console.log(`${data}`)
    })
    // console.log('启动！')
}

module.exports = (program) => {
    program
        .command('start')
        .description('启动主程序')
        .action(cmd => cmdAction(cmd))
}