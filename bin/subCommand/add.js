const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')
const crypto = require('crypto')
const repoTemplate = require('../setting.js').repoTemplate

function getProperty(question, errInfo) {
    do {
        const result = readlineSync.question(question)
        if (result) {
            return result
        }
        else {
            console.log(errInfo)
        }
    } while (true)
}

function getRandomHex(length) {
    const buf = crypto.randomBytes(length)
    return buf.toString('hex')
}

function getDeployScript(defaultValue) {
    const result = readlineSync.question(`请输入需要执行的shell脚本(${defaultValue}): `)
    return result ? result : defaultValue
}

function getSecret() {
    const LENGTH = 64
    const result = readlineSync.question(`请输入git webhook的密钥(随机生成${LENGTH}位密钥): `)
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
    const result = readlineSync.question(`请输入希望执行自动部署的分支，使用逗号分隔(只部署master分支): `)
    if (result) {
        return result.split(',').map(branch => branch.replace(/^\s+|\s+$/g,""))
    }
    else {
        return [ 'master' ]
    }
}

function cmdAction(cmd) {
    const settingFile = path.join(__dirname, '../setting.json')
    const resp = fs.readFileSync(settingFile, 'utf8')
    const setting = JSON.parse(resp)
    let template = JSON.parse(JSON.stringify(repoTemplate))

    template.router = getProperty('请输入git仓库名: ', '错误! 请确保输入了正确的git仓库名')
    template.path = getProperty('请输入本地对应的git目录: ', '错误! 请确保输入了正确的git目录')
    template.deployScript = getDeployScript(template.deployScript)
    template.secret = getSecret()
    template.branchs = getBranchs()

    setting.gitRepos.push(template)
    fs.writeFileSync(settingFile, JSON.stringify(setting, null, 4))
}

module.exports = (program) => {
    program
        .command('add')
        .description('添加一个git仓库')
        .action(cmd => cmdAction(cmd))
}