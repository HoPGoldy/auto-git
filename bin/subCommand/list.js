import path from 'path'
import fs from 'fs'

export default (program) => {
    program
        .command('list', '列出当前设置')
        .action((cmd) => {
            const resp = fs.readFileSync(path.join(__dirname, '../setting.json'), 'utf8')
            const data = JSON.parse(resp)
            console.log(`服务将开放在端口: ${data.startPort}`)
            if (data.gitRepos.length > 0) {
                data.gitRepos.map(repo => {
                    console.log(repo)
                })
            }
            else {
                console.log('没有已添加的git仓库')
            }
        })
}