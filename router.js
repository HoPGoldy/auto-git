import express from 'express'
import { execFileAsync } from './exec/exec'
import config from './config'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, (req, res) => {
        console.log('请求触发，正在拉取代码')
        const payload = JSON.parse(req.body.payload)
        console.log(payload.repository.git_url)

        execFileAsync('./exec/gitDownload.sh', [ repo.path ])
        res.send(200)
    })
})

export default router
