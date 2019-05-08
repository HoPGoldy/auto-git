import express from 'express'
const app = express()
// 引入post解析中间件
import bodyParser from 'body-parser'
import multer from 'multer'
let upload = multer()

import router from './router/router'
import config from './config'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(upload.array())

app.use('/', router)

import { log } from './utils'

app.listen(config.startPort, () => {
    log(`启动于端口 ${config.startPort}`)
	config.gitRepos.map(repo => {
		log(`开放路由 > localhost:${config.startPort}/${repo.router}`)
	})
})
