import { spawn } from 'child_process'
import path from 'path'
import { log } from '../utils'

export function execAsync(filePath, args=[]) {
    return new Promise((resolve, reject) => {
        try {
            const cmdProcess = spawn(filePath, args, {
                cwd: path.isAbsolute(filePath) ? path.dirname(filePath) : undefined
            })

            cmdProcess.on('error', err => resolve({
                state: false,
                err
            }))
    
            cmdProcess.stdout.on('data', data => console.log(`${data}`))
            
            cmdProcess.stderr.on('data', data => console.log(`${data}`))
            
            cmdProcess.on('close', code => resolve({
                state: true,
                code
            }))
        }
        catch (e) {
            log(`无法执行 ${filePath}, 请检查脚本是否有执行权限`)
        }
    })
}
