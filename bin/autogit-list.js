const program = require('commander')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

function showAllStore() {
    const settingFile = path.join(__dirname, 'setting.json')
    const setting = JSON.parse(fs.readFileSync(settingFile, 'utf8'))
    console.log('---- 已部署项目 ----')
    if (setting.gitRepos.length > 0) {
        setting.gitRepos.map(repo => {
            const color = chalk
            console.log(
                `\n仓库名称: ${color.green(repo.router)}`,
                `\n项目路径: ${color.green(repo.path)}`,
                `\n部署脚本: ${color.green(repo.deployScript)}`,
                `\n验证密钥: 请键入 ${color.green('autogit list --showpwd ' + repo.router)} 查看`,
                `\n部署分支: ${color.green(repo.branchs.join(', '))}`
            )
        })
    }
    else {
        console.log('没有已添加的git仓库')
    }
}

function showPassword(storeName) {
    const settingFile = path.join(__dirname, 'setting.json')
    const setting = JSON.parse(fs.readFileSync(settingFile, 'utf8'))

    const targetRepo = setting.gitRepos.map((repo, index) => ({
        name: repo.router,
        index: index
    })).find(item => item.name == storeName)

    if (targetRepo) {
        console.log(`项目 ${chalk.green(storeName)} 的密钥为\n${chalk.green(setting.gitRepos[targetRepo.index].secret)}`)
    }
    else {
        console.log(`未发现 ${chalk.green(storeName)} 项目`)
    }
}

function cmdAction(cmd) {
    if ('showpwd' in cmd) {
        showPassword(cmd.showpwd)
    }
    else {
        showAllStore()
    }
}

program
    .option('-s, --showpwd [仓库名称]', '显示指定仓库名称的密码')
    .action(cmd => cmdAction(cmd))
    .parse(process.argv)