import { spawn } from 'child_process'
import path from 'path'

export function execAsync(filePath, args=[]) {
    return new Promise((resolve, reject) => {
        const cmdProcess = spawn(filePath, args)

        cmdProcess.stdout.on('data', (data) => {
            console.log(data)
        })
        
        cmdProcess.stderr.on('data', (data) => {
            console.log(data)
        })
        
        cmdProcess.on('close', (code) => {
            resolve({
                state: true,
                code
            })
        })

        cmdProcess.on('error', (err) => {
            resolve({
                state: false,
                err
            })
        })
    })
}
