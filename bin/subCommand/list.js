const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = (program) => {
    program
        .command('list')
        .description('列出当前设置')
        .action((cmd) => {
            const resp = fs.readFileSync(path.join(__dirname, '../setting.json'), 'utf8')
            const data = JSON.parse(resp)
            console.log(`\n服务将开放在端口: ${data.startPort}`)
            if (data.gitRepos.length > 0) {
                data.gitRepos.map(repo => {
                    console.log(
                        `仓库名: ${chalk.green(repo.router)}`,
                    )
                })
            }
            else {
                console.log('没有已添加的git仓库\n')
            }
        })
}