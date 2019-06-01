import { execAsync } from '../exec/exec'
import path from 'path'
import crypto from 'crypto'
import { log } from '../utils'

// secret校验
const checkSignature = (repo) => {
    return async (req, res, next) => {
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
        
        next()
    }
}

// 检查分支是否正确
const checkBranch = (repo) => {
    return async (req, res, next) => {
        next()
    }
}

// 拉取代码
const pullCode = (repo) => {
    return async (req, res, next) => {
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

        next()
    }
}

// 执行自动部署脚本
const execScript = (repo) => {
    return async (req, res, next) => {
        log('代码拉取完成，正在执行部署脚本\n')
        let execResult = await execAsync(path.join(repo.path, repo.deployScript))

        if (!execResult.state) {
            log('执行失败，错误信息如下')
            console.log(execResult.err)
            res.send(false)
            return false
        }

        log('执行完成，待命中')
        res.send(true)
    }
}

function sign(data, secret) {
    return 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex')
}

export default {
    checkSignature,
    checkBranch,
    pullCode,
    execScript
}