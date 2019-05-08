import express from 'express'
import { execFileAsync } from '../exec/exec'
import config from '../config'
import path from 'path'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, async (req, res) => {
        console.log('请求触发，正在拉取代码')
        const payload = JSON.parse(req.body.payload)
        console.log(payload.repository.git_url)

        let pullResult = await execFileAsync('./src/exec/gitDownload.sh', [ repo.path ])
        if (!pullResult.state) {
            console.log('执行失败', pullResult.msg)
            res.send(false)
            return false
        }
        else {
            console.log(pullResult.stdout)
        }

        console.log('代码拉取完成，正在执行auto-deploy.sh')
        let execResult = await execFileAsync(path.join(repo.path, repo.deployScript))
		console.log(execResult)
        if (!execResult.state) {
			// console.log('执行失败，请确保项目根目录中包含拥有可执行权限的 auto-deploy.sh 文件')
            console.log('执行失败，错误信息如下', execResult.msg)
            res.send(false)
            return false
        }
        else {
            console.log(execResult.stdout)
        }

		console.log('执行完成，待命中')
        res.send(true)
    })
})

export default router
