#!/usr/bin/env node  

const program = require('commander')
const addSubCommand = require('./subCommand')
const initSetting = require('./setting').initSetting
// 注册常用方法
require('./setting').signUesfulFunction()

initSetting().then(() => {
    program
        .version('1.1.0')
        .description('服务端git项目自动部署工具')

    addSubCommand(program)

    program.parse(process.argv)
})