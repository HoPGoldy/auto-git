#! /bin/bash

echo "清除过期镜像"
docker container rm -f example-image
docker image rm example-image
echo "重新构建镜像"
docker build -t example-image .
echo "运行容器"
docker run -d --name="example" example-image