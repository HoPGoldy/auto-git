import express from 'express'
// import { displayRoutes } from 'express-routemap'
let displayRoutes = require('express-routemap')
import router from './router'
import config from './config'

const app = express()

app.use('/', router)

app.listen(config.startPort, () => {
    console.log(`app start at port ${config.startPort}`)
    displayRoutes(app)
})
