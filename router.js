import express from 'express'
import { execFileAsync } from './exec/exec'
import config from './config'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, (req, res) => {
        console.log('收到push hook')
        const payload = JSON.parse(req.body.payload)
        console.log(payload.repository.git_url)

        execFileAsync('./exec/gitDownload.sh').then(result => {
            console.log('执行结果', result)
        })
        res.send(repo.path)
    })
})

export default router
