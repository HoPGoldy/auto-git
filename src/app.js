import express from 'express'
const app = express()
import displayRoutes from 'express-routemap'
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

app.listen(config.startPort, () => {
    console.log(`\napp start at port ${config.startPort}`)
    displayRoutes(app)
})
