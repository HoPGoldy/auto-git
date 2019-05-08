import express from 'express'
import { execAsync } from '../exec/exec'
import config from '../config'
import path from 'path'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, async (req, res) => {
        console.log('请求触发，正在拉取代码')
        const payload = JSON.parse(req.body.payload)
        console.log(payload.repository.git_url)

        let pullResult = await execAsync('./src/exec/gitDownload.sh', [ repo.path ])
        if (!pullResult.state) {
            console.log('执行失败', pullResult.err)
            res.send(false)
            return false
        }
        else {
            console.log(pullResult.stdout)
        }

        console.log('代码拉取完成，正在执行部署脚本')
        let execResult = await execAsync(path.join(repo.path, repo.deployScript))

        if (!execResult.state) {
			// console.log('执行失败，请确保项目根目录中包含拥有可执行权限的 auto-deploy.sh 文件')
            console.log('执行失败，错误信息如下', execResult.err)
            res.send(false)
            return false
        }

		console.log('执行完成，待命中')
        res.send(true)
    })
})

export default router
