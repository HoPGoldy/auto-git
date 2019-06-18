import program from 'commander'
import addSubCommand from './subCommand'
import { initSetting } from './setting'

initSetting().then(() => {
    program
        .version('0.1.0')
        .description('服务端git项目自动部署工具')

    addSubCommand(program)

    program.parse(process.argv)
})