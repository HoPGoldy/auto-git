const spawn = require('child_process').spawn
const path = require('path')
const program = require('commander')

function cmdAction(cmd) {
    const startFile = path.join(__dirname, '../start.js')
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


program
    .action(cmd => cmdAction(cmd))
    .parse(process.argv)
