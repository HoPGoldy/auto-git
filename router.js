import express from 'express'
import { execFileAsync } from './exec/exec'
import config from './config'
import path from 'path'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, async (req, res) => {
        console.log('请求触发，正在拉取代码')
        const payload = JSON.parse(req.body.payload)
        console.log(payload.repository.git_url)

        let pullResult = await execFileAsync('./exec/gitDownload.sh', [ repo.path ])
        if (!pullResult.state) {
            console.log('执行失败', pullResult.msg)
            res.send(false)
            return false
        }
        else {
            console.log(pullResult.msg)
        }

        console.log('代码拉取完成，正在执行auto-deploy.sh')
        let execResult = await execFileAsync(path.join(repo.path, repo.deployScript))
        if (!execResult.state) {
            console.log('执行失败', execResult.msg)
            res.send(false)
            return false
        }
        else {
            console.log(execResult.msg)
        }

        res.send(true)
    })
})

export default router
