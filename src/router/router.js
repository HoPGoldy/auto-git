import express from 'express'
import { gitRepos } from '../config'
import { checkSignature, checkBranch, pullCode, execScript } from '../controller/gitHook'

let router = express.Router()

gitRepos.map(repo => {
    router.post(`/${repo.router}`,
        checkSignature(repo),
        pullCode(repo),
        execScript(repo)
    )
})

export default router
