export default {
    gitRepos: [
        // // 通过复制并编辑该配置项来新建路由
        // {
        //     // router 为该项目的专用路由 完整地址为 http://hostUrl:3038/[router]
        //     router: 'testRepo1',
        //     // path 为该项目的绝对访问路径 请确保该路径下存在项目的.git目录
        //     path: '/home/auto-deploy-test-repo',
        //     // deployScript 为该项目根文件下用于执行自动部署的脚步名称
        //     deployScript: 'auto-deploy.sh'
        // },
        {
            // router 为该项目的专用路由 完整地址为 http://hostUrl:3038/[router]
            router: 'testRepo1',
            // path 为该项目的绝对访问路径 请确保该路径下存在项目的.git目录
            path: '/home/auto-deploy-test-repo',
            // deployScript 为该项目根文件下用于执行自动部署的脚步名称
            deployScript: 'auto-deploy.sh'
        },
    ],
	startPort: 3038
}
