import express from 'express'
import { checkSignature, checkBranch, pullCode, execScript } from '../controller/gitHook'
// 获取设置项
import { resolve } from 'path'
import userHome from 'user-home'
import fs from 'fs'
const settingFile = resolve(userHome, '.autogitSetting.json')
let { gitRepos } = JSON.parse(fs.readFileSync(settingFile, 'utf8'))

let router = express.Router()

gitRepos.map(repo => {
    router.post(`/${repo.router}`,
        checkSignature(repo),
        checkBranch(repo),
        pullCode(repo),
        execScript(repo)
    )
})

export default router
