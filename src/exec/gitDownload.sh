#! /bin/bash
# 参数检查
if [ $# -lt 1 ]; then
	echo 参数数量不正确
	exit 1
fi;

gitPath=$1
cd $gitPath
git pull
