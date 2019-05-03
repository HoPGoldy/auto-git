import express from 'express'
const app = express()
let displayRoutes = require('express-routemap')
// 引入post解析中间件
let bodyParser = require('body-parser')
let multer = require('multer')
let upload = multer()

import router from './router'
import config from './config'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(upload.array())

app.use('/', router)

app.listen(config.startPort, () => {
    console.log(`\napp start at port ${config.startPort}`)
    displayRoutes(app)
})
