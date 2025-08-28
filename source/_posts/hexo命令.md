---
title: hexo命令
date: 2025-08-21 17:42:08
updated: 2025-08-21 17:42:08
categories:
  - 命令
tags:
  - 部署
  - 命令
description: 记录常用的Hexo博客搭建与管理命令。
---

<!-- 文章正文开头... -->

<!--more-->

# Hexo 命令大全

## 初始化命令

### hexo init [folder]

初始化Hexo到指定目录。如果文件夹不存在，会自动创建。

示例：

```
hexo init myblog  # 在当前目录创建myblog文件夹并初始化Hexo
```

### npm install

安装Hexo所需的依赖包。在初始化后的目录中运行此命令。

## 内容创建命令

### hexo new [layout] "标题"

创建新文章。layout可以是post、page或draft，默认为post。

示例：

```
hexo new post "Hello World"  # 创建一篇名为Hello World的文章
hexo new page "about"       # 创建一个关于页面
hexo new draft "new-idea"   # 创建一个草稿
```

### hexo publish [layout] "文件名"

将草稿移动到post目录，即发布草稿。

示例：

```
hexo publish draft "new-idea"  # 发布名为new-idea的草稿
```

## 生成与预览命令

### hexo generate

生成静态文件。使用简写 `hexo g` 效果相同。

常用选项：

```
hexo generate --watch  # 监视文件变动并重新生成
hexo generate --draft  # 包含草稿
```

### hexo server

启动本地服务器预览。使用简写 `hexo s` 效果相同。

常用选项：

```
hexo server -p 5000    # 指定端口5000
hexo server -i 0.0.0.0 # 指定IP地址
hexo server --draft    # 包含草稿
```

## 部署命令

### hexo deploy

部署网站到服务器。使用简写 `hexo d` 效果相同。

常用选项：

```
hexo deploy --generate  # 部署前先生成，等同于 hexo g -d
```

### hexo clean

清除缓存文件(db.json)和已生成的静态文件(public)。

提示：遇到奇怪的问题时，先执行此命令清除缓存，然后再重新生成和部署。

## 其他实用命令

### hexo list [type]

列出网站中的所有文件。type可以是page、post、route、tag或category。

### hexo version

显示Hexo版本信息。

### hexo --draft

显示草稿中的文章（在generate或server命令中使用）。

## 使用技巧

1. 组合使用命令可以提高效率，例如：`hexo g -d` 可以一次性完成生成和部署。
2. 在服务器运行时，可以边修改边预览效果，Hexo会自动检测更改并刷新页面。
3. 使用草稿功能可以保存尚未完成的文章，避免未完成的内容被发布。
4. 部署前建议先使用 `hexo s` 在本地预览效果，确认无误后再部署。

## 常用命令组合

```
# 清理、生成并部署
hexo clean && hexo g -d

# 生成包含草稿并在本地预览
hexo g --draft && hexo s --draft

# 创建文章并立即启动服务器
hexo new post "新文章" && hexo s
```

## 插件相关命令

### 安装插件

```
npm install hexo-plugin-name --save
```

### 卸载插件

```
npm uninstall hexo-plugin-name --save
```

## 调试命令

### 显示详细生成信息

bash

```
hexo generate --debug
```

### 显示部署详细信息

bash

```
hexo deploy --debug
```

## 环境变量

bash

```
# 设置环境为生产环境
hexo generate --production

# 设置环境为开发环境（默认）
hexo generate --development
```

更多信息请参考 [Hexo官方文档](https://hexo.io/zh-cn/docs/)