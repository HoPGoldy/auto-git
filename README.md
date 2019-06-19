# auto-deploy
一个基于express的轻量级服务端自动部署工具

# 介绍

该工具实质上是一个使用 `express` 搭建的web服务器，使用了 git 的 webhook 来执行项目中的 shell 脚本，从而完成服务端的自动化部署功能。

# 安装

**npm**

```
npm install @hopgoldy/auto-git -g
```

**yarn**

```
yarn global add @hopgoldy/auto-git
```

**检查是否安装完成**

```
autogit -V
```

# 使用方法

## 步骤一：下载目标项目

在服务器上使用 git 下载指定项目，并使用 `pwd` 命令获取其路径（请确保该路径下存在.git目录）

## 步骤二：配置auto-deploy

在任意位置键入如下命令，auto-git 将会启动新建流程

```
autogit add
```

之后 `auto-git` 会向您询问如下内容:

- 目标 git 仓库的名称
- 步骤一中获取的项目路径
- 需要自动执行的脚本名称
- `git webhook` 中要求的请求密钥
- 要自动部署的分支名

填写完成后即可完成配置，具体的配置项可以通过如下命令查看，该命令会列出所有的配置项

```
autogit list
```

```
---- 已部署项目 ----

仓库名称: test 
项目路径: /home/test 
部署脚本: auto-deploy.sh 
验证密钥: 2ca9147181f07391b8e5a3e8d564f62eadebb
部署分支: master
```

最后使用如下命令启动 `auto-git` 服务，看到输出如下启动信息即为正常启动:

```
autogit start
```

```
AUTO-GIT 启动于端口 3038

AUTO-GIT 开放路由 > localhost:3038/test
```

## 步骤三：配置的webhook

打开github，访问 **setting > webhook** 配置上一步中新建的 URL 以及 Secret，注意：`Content type` 需要选择为 `application/json`

## 步骤四：新建部署脚本

在项目的根目录下新建 shell 脚本，脚本名称应该与第二步中设置的相同（默认为 `auto-deploy.sh`），**注意**：请确保该脚本有执行权限。在本项目的 `/example` 文件夹下包含有两个示例部署脚本，分别是：

- `auto-deploy-with-forever.sh` 使用 forever 部署 node 项目
- `auto-deploy-with-docker.sh` 使用 docker 构建并部署 node 项目



## 步骤五：测试

提交目标项目代码，若一切正常则应该可以看到 auto-deploy 服务自动拉取项目代码并执行 auto-deploy.sh 脚本

![演示](src/images/show.gif)

# 注意事项

**请不要手动修改目标项目中已经拉取的代码！** 若新代码没有加入 git 暂存区，auto-deploy 在拉取代码前会将其清空。若已经加入 git 暂存区或提交了 commit ，那么 auto-deploy 在拉取代码时可能会出错。

所以，请确保服务器项目中的git工作区的整洁

```bash
user@server: /your/project/path# git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```
