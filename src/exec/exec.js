import { execFile } from 'child_process'

export function execFileAsync(filePath, args=[]) {
    return new Promise((resolve, reject) => {
        execFile(filePath, args, { 
            env: {
                PATH: process.env.PATH,
                HOME: process.env.HOME
            }
        }, (err, stdout, stderr) => {
            if(err) {
                resolve({
                    state: false,
                    msg: err
                })
            }
            // console.log(`stdout: \n${stdout}\n`)
            resolve({
                state: true,
                stdout,
                stderr
            })
        })
    })
}
