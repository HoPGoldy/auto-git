import program from 'commander'
import { initSetting } from './setting'

program
    .version('0.1.0')
    .description('服务端git项目自动部署工具')

initSetting()

program.parse(process.argv)
