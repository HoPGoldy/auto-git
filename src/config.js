export const gitRepos = [
    // // 通过复制并编辑该配置项来新建路由
    // {
    //     // router 为该项目的专用路由 完整地址为 http://hostUrl:3038/[router]
    //     router: 'testRepo1',
    //     // path 为该项目的绝对访问路径 请确保该路径下存在项目的.git目录
    //     path: '/home/auto-deploy-test-repo',
    //     // deployScript 为该项目根文件下用于执行自动部署的脚步名称
    //     deployScript: 'auto-deploy.sh',
    //     // secret 为项目 webhook 中配置的密匙，该项为必填项
    //     secret: 'a12345',
    //     // 设置需要进行部署的分支
    //     branchs: [ "master" ]
    // }
    {                                                                                                                                                                                    
        router: 'github-io',                                                                                                                                                             
        path: '/home/github-io-backend',                                                                                                                                                 
        deployScript: 'auto-deploy.sh',                                                                                                                                                  
        secret: '60060a1b472e80e2097cbfe37b9fe8fe'                                                                                                                                       
    },                                                                                                                                                                                   
    {                                                                                                                                                                                    
        router: 'student-club-management-system-server',                                                                                                                                 
        ath: '/home/student-club-management-system-server',                                                                                                                             
        deployScript: 'auto-deploy.sh',                                                                                                                                                  
        secret: '74c183c1de9620f1cec228a89981957f'                                                                                                                                       
    }
]

export const serverInfo = {
    // 启动端口号
    startPort: 3038
}