const fs = require('fs')
const path = require('path')

// 设置json保存的位置
const settingFile = path.resolve(require('user-home'), '.autogitSetting.json')
// 配置项的初始模板
const settingTempalte = {
    serverInfo: {
        startPort: 3038
    },
    gitRepos: [ ]
}
// 新建自动部署项目时使用的配置项
const repoTemplate = {
    // router 为该项目的专用路由 完整地址为 http://hostUrl:3038/[router]
    router: 'testRepo1',
    // path 为该项目的绝对访问路径 请确保该路径下存在项目的.git目录
    path: '/home/auto-deploy-test-repo',
    // deployScript 为该项目根文件下用于执行自动部署的脚步名称
    deployScript: 'auto-deploy.sh',
    // secret 为项目 webhook 中配置的密匙，该项为必填项
    secret: 'a12345',
    // 设置需要进行部署的分支
    branchs: [ "master" ]
}

// 读取配置项
function load() {
    return JSON.parse(fs.readFileSync(settingFile, 'utf8'))
}
// 覆写配置项
function save(data) {
    fs.writeFileSync(settingFile, JSON.stringify(data, null, 4))
}
// 初始化配置项，包含以下功能
// - 未发现 setting.json 时新建 json
function init() {
    try {
        fs.statSync(settingFile)
    }
    catch (e) {
        console.log('设置文件不存在, 已新建')
        save(settingTempalte)
    }
}

module.exports = {
    load,
    save,
    init, 
    repoTemplate
}