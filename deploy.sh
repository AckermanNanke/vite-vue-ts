#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
git init
git add -A
git commit -m 'github-pages创建'


# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:AckermanNanke/vite-vue-ts.git master:gh-pages

cd -