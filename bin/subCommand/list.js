const fs = require('fs')
const path = require('path')

function cmdAction(cmd) {
    const resp = fs.readFileSync(path.join(__dirname, '../setting.json'), 'utf8')
    const data = JSON.parse(resp)
    console.log('---- 已部署项目 ----')
    if (data.gitRepos.length > 0) {
        data.gitRepos.map(repo => {
            const color = console.color
            console.log(
                `\n仓库名称: ${color.green(repo.router)}`,
                `\n项目路径: ${color.green(repo.path)}`,
                `\n部署脚本: ${color.green(repo.deployScript)}`,
                `\n验证密钥: ${color.green(repo.secret)}`,
                `\n部署分支: ${color.green(repo.branchs.join(', '))}`
            )
        })
    }
    else {
        console.log('没有已添加的git仓库')
    }
}

module.exports = (program) => {
    program
        .command('list')
        .description('列出当前设置')
        .action(cmd => cmdAction(cmd))
}