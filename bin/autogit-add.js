const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const repoTemplate = require('./setting.js').repoTemplate
const program = require('commander')

const readlineSync = require('readline-sync')
console.question = readlineSync.question

function getStoreName(allStoreNames) {
    do {
        const result = console.question('请输入git仓库名: ')
        if (result) {
            if (!allStoreNames.find(name => name === result)) {
                return result
            }
            else {
                console.log(`仓库名 ${console.color.green(result)} 已被使用`)
            }
        }
    } while (true)
}

function getPath(defaultValue) {
    const result = console.question(`请输入本地对应的仓库路径(${defaultValue}): `)
    return result ? result : defaultValue
}

function getRandomHex(length) {
    const buf = crypto.randomBytes(length)
    return buf.toString('hex')
}

function getDeployScript(defaultValue) {
    const result = console.question(`请输入需要执行的shell脚本(${defaultValue}): `)
    return result ? result : defaultValue
}

function getSecret() {
    const LENGTH = 64
    const result = console.question(`请输入git webhook的密钥(随机生成${LENGTH}位密钥): `)
    if (result) {
        return result
    }
    else {
        const sercet = getRandomHex(LENGTH)
        console.log(`您的随机${LENGTH}位密钥为:\n${sercet}\n请妥善保存`)
        return sercet
    }
}

function getBranchs() {
    const result = console.question(`请输入希望执行自动部署的分支，使用逗号分隔(只部署master分支): `)
    if (result) {
        return result.split(',').map(branch => branch.replace(/^\s+|\s+$/g,""))
    }
    else {
        return [ 'master' ]
    }
}

function cmdAction(cmd) {
    const settingFile = path.join(__dirname, 'setting.json')
    const resp = fs.readFileSync(settingFile, 'utf8')
    const setting = JSON.parse(resp)
    let template = JSON.parse(JSON.stringify(repoTemplate))

    template.router = getStoreName(setting.gitRepos.map(repo => repo.router))
    template.path = getPath(`/home/${template.router}`)
    template.deployScript = getDeployScript(template.deployScript)
    template.secret = getSecret()
    template.branchs = getBranchs()

    setting.gitRepos.push(template)
    fs.writeFileSync(settingFile, JSON.stringify(setting, null, 4))
}

program
    .action(cmd => cmdAction(cmd))
    .parse(process.argv)