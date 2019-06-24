const program = require('commander')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const readlineSync = require('readline-sync')

function cmdAction(cmd) {
    const settingFile = path.join(__dirname, 'setting.json')
    let setting = JSON.parse(fs.readFileSync(settingFile, 'utf8'))
    let repoIndex = undefined
    
    setting.gitRepos.map((repo, index) => {
        if (repo.router == cmd) {
            repoIndex = index
        }
    })
    
    const color = chalk
    if (repoIndex != undefined) {
        const result = readlineSync.question(`是否要删除 ${color.green(cmd)} 的自动部署?[yes/no] `)
        if (['yes', 'y', 'YES', 'Y'].find(item => item == result)) {
            setting.gitRepos.splice(repoIndex, 1)
            fs.writeFileSync(settingFile, JSON.stringify(setting, null, 4))

            console.log(`${color.green(cmd)} 的自动部署已被移除`)
        }
        else {
            console.log('操作取消')
        }
    }
    else {
        console.log(`未找到名为 ${color.green(cmd)} 的自动部署`)
    }
}

program
    .action(cmd => cmdAction(cmd))
    .parse(process.argv)