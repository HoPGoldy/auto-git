const { exec, execFile } = require('child_process')
const path = require('path')

export async function execAsync(command) {
    exec(command, (err, stdout, stderr) => {
        if(err) {
            console.log(err)
            return false
        }
        console.log(`stdout: \n${stdout}\n`)
        console.log(`stderr: \n${stderr}\n`)

        return true
    })
}

export async function execFileAsync(filePath) {
    execFile(filePath, [], { 
        env: {
            PATH: process.env.PATH,
            HOME: process.env.HOME
        }
    }, (err, stderr, stdout) => {
        if(err) {
            console.log(err)
            return false
        }
        console.log(`stdout: \n${stdout}\n`)
        console.log(`stderr: \n${stderr}\n`)

        return true
    })
}