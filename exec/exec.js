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

export async function execFileAsync(filePath, args=[]) {
    execFile(filePath, args, { 
        env: {
            PATH: process.env.PATH,
            HOME: process.env.HOME
        }
    }, (err, stdout, stderr) => {
        if(err) {
            return {
                state: false,
                msg: err
            }
        }
        // console.log(`stdout: \n${stdout}\n`)
        return {
            state: true,
            msg: stdout
        }
    })
}
