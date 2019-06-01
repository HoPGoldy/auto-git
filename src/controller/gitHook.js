import { execAsync } from '../exec/exec'
import path from 'path'
import crypto from 'crypto'
import { log } from '../utils'

// secret校验
export const checkSignature = (repo) => {
    return async (req, res, next) => {
        log('收到请求，正在校验签名')
        const secret = req.headers['x-hub-signature']
        const payload = req.body
		if (secret) {
			const key = sign(JSON.stringify(payload), repo.secret)
			if (key != secret) {
				log('校验失败, 部署结束, 待命中')
				res.send(false)
				return false
			}
		}
		else {
			log('未发现签名, 部署结束, 待命中')
			res.send(false)
			return false
        }

        
        console.log(
            `\n 项目名称: ${payload.repository.name}\n`,
            `推送信息: ${payload.head_commit.message}\n`,
            `推送者: ${payload.head_commit.committer.name}\n`,
        )
        
        next()
    }
}

// 检查分支是否正确
export const checkBranch = (repo) => {
    return async (req, res, next) => {
        log('校验完成，正在检查分支')
        const payload = req.body
        const branchName = payload.ref.split('/').pop()
        
        let correctBranchList = repo.branchs.find(branch => branch === branchName)
        if (correctBranchList) {
            next()
            return true
        }
        else {
            res.send(false)
            log(`推送分支为${branchName}, 不在部署分支列表内, 部署结束, 待命中`)
            return false
        }
    }
}

// 拉取代码
export const pullCode = (repo) => {
    return async (req, res, next) => {
        log('通过检查，正在拉取代码\n')
        const payload = req.body
        console.log(payload.repository.git_url)

        let pullResult = await execAsync('./src/exec/gitDownload.sh', [ repo.path ])
        if (!pullResult.state) {
            log('执行失败, 错误信息如下, 部署结束, 待命中')
            console.log(pullResult.err)
            res.send(false)
            return false
        }

        next()
    }
}

// 执行自动部署脚本
export const execScript = (repo) => {
    return async (req, res, next) => {
        log('代码拉取完成，正在执行部署脚本\n')
        let execResult = await execAsync(path.join(repo.path, repo.deployScript))

        if (!execResult.state) {
            log('执行失败，错误信息如下, 部署结束, 待命中')
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