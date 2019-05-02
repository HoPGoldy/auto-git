import express from 'express'
import child_process from 'child_process'
import config from './config'

let router = express.Router()

config.gitRepos.map(repo => {
    router.post(`/${repo.router}`, (req, res) => {
        res.send(repo.path)
    })
})

export default router