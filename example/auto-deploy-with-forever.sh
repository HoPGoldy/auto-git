#! /bin/bash

echo "重新加载依赖"
yarn config set registry 'https://registry.npm.taobao.org'
yarn

echo "运行项目"
forever stop example-app
NODE_ENV=production forever start --append --minUptime 1000 --spinSleepTime 10000 --uid example-app -c node start.js 