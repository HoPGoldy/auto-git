import express from 'express'
const app = express()
// 引入post解析中间件
import bodyParser from 'body-parser'
import multer from 'multer'
let upload = multer()

import router from './router/router'

// 获取设置项
import path from 'path'
import fs from 'fs'
const settingFile = path.join(__dirname, '../bin/setting.json')
let { serverInfo, gitRepos } = JSON.parse(fs.readFileSync(settingFile, 'utf8'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(upload.array())

app.use('/', router)

import { log } from './utils'

app.listen(serverInfo.startPort, () => {
    log(`启动于端口 ${serverInfo.startPort}`)
	gitRepos.map(repo => {
		log(`开放路由 > localhost:${serverInfo.startPort}/${repo.router}`)
	})
})
