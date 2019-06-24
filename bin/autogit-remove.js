const program = require('commander')
const setting = require('./setting')
const chalk = require('chalk')
const readlineSync = require('readline-sync')

function cmdAction(cmd) {
    let settingData = setting.load()
    let repoIndex = undefined
    
    settingData.gitRepos.map((repo, index) => {
        if (repo.router == cmd) {
            repoIndex = index
        }
    })
    
    const color = chalk
    if (repoIndex != undefined) {
        const result = readlineSync.question(`是否要删除 ${color.green(cmd)} 的自动部署?[yes/no] `)
        if (['yes', 'y', 'YES', 'Y'].find(item => item == result)) {
            settingData.gitRepos.splice(repoIndex, 1)
            setting.save(settingData)

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