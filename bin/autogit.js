#!/usr/bin/env node  
const program = require('commander')
require('./setting').init()
const fs = require('fs')
const packageVersion = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version

program
    .version(packageVersion)
    .description('服务端git项目自动部署工具')
    .command('add', '添加一个git仓库')
    .command('start', '启动主程序')
    .command('config', '修改已存在的配置文件')
    .command('list', '列出当前设置')
    .command('remove <storeName>', '删除指定仓库的webhook')
    .parse(process.argv)