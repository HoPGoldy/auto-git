const program = require('commander')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

// 支持的属性修改参数
const changeOptions = [
    {
        name: 'storeName',
        shortNmae: 'n',
        describeName: '项目名',
        describe: ' 修改项目名称',
        settingName: 'router'
    },
    {
        name: 'path',
        describeName: '项目路径',
        describe: '修改本地项目路径',
        settingName: 'path'
    },
    {
        name: 'deployScript',
        describeName: '部署脚本',
        describe: '修改项目中的自动部署shell脚本的名称',
        settingName: 'deployScript'
    },
    {
        name: 'secret',
        describeName: '验证密钥',
        describe: '修改 git webhook 中配置的密钥',
        settingName: 'secret'
    },
    {
        name: 'branchs',
        describeName: '部署分支名',
        describe: '修改需要自动部署的分支名，使用逗号分隔',
        settingName: 'branchs'
    },
]

function cmdAction(cmd) {
    // 验证 t 参数
    if (!cmd.target) {
        console.log('请先使用 -t 参数指定一个要修改的项目名称')
        return false
    }
    const targetName = cmd.target

    const settingFile = path.join(__dirname, 'setting.json')
    const setting = JSON.parse(fs.readFileSync(settingFile, 'utf8'))
    
    // 查找选项目名
    let targetRepoIndex = undefined
    setting.gitRepos.map((repo, index) => { if (repo.router === targetName) targetRepoIndex = index})

    const color = chalk
    if (targetRepoIndex != undefined) {
        // 根据 changeOptions 依次检查是否需要修改
        changeOptions.map(option => {
            if (cmd[option.name]) {
                console.log(
                    `${option.describeName}:`,
                    `${color.yellow(setting.gitRepos[targetRepoIndex][option.settingName])}`,
                    `> ${color.green(cmd[option.name])}`
                )

                setting.gitRepos[targetRepoIndex][option.settingName] = (option.name != 'branchs') ?
                    cmd[option.name] :
                    cmd[option.name].split(',')
            }
        })
    }
    else {
        console.log(`未发现 ${color.green(targetName)} 项目`)
    }

    fs.writeFileSync(settingFile, JSON.stringify(setting, null, 4))
}

let subProgram = program
    .option('-t, --target <项目名称>', '要修改的项目名称')

changeOptions.map(option => {
    // 生成如下形式的参数
    //.option('-n, --name [项目名]', '修改项目名称')
    const shortName = ('shortNmae' in option) ? option.shortNmae : option.name[0]
    subProgram = subProgram.option(`-${shortName}, --${option.name} [${option.describeName}]`, option.describe)
})

subProgram
    .action(cmd => cmdAction(cmd))
    .parse(process.argv)