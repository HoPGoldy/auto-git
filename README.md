# auto-deploy
基于express的服务端自动部署工具

# 介绍

该工具实质上是一个使用 `express` 搭建的web服务器，使用了 git 的 webhook 来执行服务端的 shell 脚本，从而完成服务端的自动化部署功能。

# 安装依赖

- `yarn install` 安装依赖
- `npm start` 启动服务

# 使用方法

## 步骤一：下载目标项目

在服务器上使用 git 下载指定项目，并使用 `pwd` 命令获取其路径（请确保该路径下存在.git目录）

## 步骤二：配置auto-deploy

打开 `auto-deploy/src/config.js` 文件，使用注释内容在 `gitRepos` 中新建一个配置项，配置完成后即可使用 `npm start` 启动服务

## 步骤三：配置的webhook

打开github，访问 **setting > webhook** 配置上一步中新建的 URL 以及 Secret，注意：`Content type` 需要选择为 `application/json`

## 步骤四：新建部署脚本

在项目的根目录下新建 shell 脚本，脚本名称应该与第二步中设置的相同（默认为 `auto-deploy.sh`），**注意**：请确保该脚本有执行权限
