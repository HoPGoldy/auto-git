import express from 'express'
// import { displayRoutes } from 'express-routemap'
let displayRoutes = require('express-routemap')
import router from './router'

const app = express()

app.use('/', router)

app.listen(3000, () => {
    console.log('app start at port 3000')
    displayRoutes(app)
})