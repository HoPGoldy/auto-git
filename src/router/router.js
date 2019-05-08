import express from 'express'
import { execAsync } from '../exec/exec'
import config from '../config'
import path from 'path'
import crypto from 'crypto'
import { log } from '../utils'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, async (req, res) => {
        // secret校验
        log('收到请求，正在校验签名')
		const secret = req.headers['x-hub-signature']
		if (secret) {
			const key = sign(JSON.stringify(req.body), repo.secret)
			if (key != secret) {
				log('校验失败')
				res.send(false)
				return false
			}
		}
		else {
			log('未发现签名')
			res.send(false)
			return false
		}

        log('校验成功，正在拉取代码\n')
        const payload = req.body
        console.log(payload.repository.git_url)

        let pullResult = await execAsync('./src/exec/gitDownload.sh', [ repo.path ])
        if (!pullResult.state) {
            log('执行失败, 错误信息如下')
            console.log(pullResult.err)
            res.send(false)
            return false
        }
        
        log('代码拉取完成，正在执行部署脚本\n')
        let execResult = await execAsync(path.join(repo.path, repo.deployScript))

        if (!execResult.state) {
			// console.log('执行失败，请确保项目根目录中包含拥有可执行权限的 auto-deploy.sh 文件')
            log('执行失败，错误信息如下')
            console.log(execResult.err)
            res.send(false)
            return false
        }

		log('执行完成，待命中')
        res.send(true)
    })
})

function sign(data, secret) {
	  return 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex')
}

export default router
