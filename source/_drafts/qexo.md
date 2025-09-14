---
abbrlink: ''
categories:
- - 技术教程
date: '2025-09-14T08:13:14.136919+08:00'
tags:
- GitHub
- hexo
- 博客管理
- 网站
- 教程
title: title
updated: '2025-09-14T08:52:50.971+08:00'
---
# Qexo的安装

## 前言

**最近我一直在配置这个博客，但由于我只是一个初中生，所以现在开学了后我的时间越来越少了，还有数不清的作业，且作者还是住读生，一周下来接触电脑的时间啄食可悲，于是想到给我的博客做一个管理后台，先前尝试了不少方案，无一例外，全都缺少一个美观的界面和博客配置管理，直到我发现了这个——Qexo，这个真是集结了我所有想要的功能，简直完美！好，废话不多说，开始配置！**

## 安装

**Qexo可以通过docker或vercel来安装，我这边用的是vercel，你可以通过 Vercel 提供的免费数据库。但请注意这是个 Beta 功能** [vercel一键部署](https://vercel.com/new/clone?repository-url=https://github.com/am-abudu/Qexo) **首次部署会报错, 请无视并进行接下来的步骤。**

### 申请 Vercel 数据库

**进入Vercel Storage 界面 然后点击右上角的 Create Database 并选择 Postgres 创建免费 PostgreSQL 数据库, 在 Connect 页面获取数据库连接信息。请注意在地区选择的位置选择与你上一步项目对应的地区（通常为 Washington, D.C., USA (East) - iad1）。**

### 绑定项目

**在左侧边栏选择 Projects 点击 Connect Project 连接到你第一步创建的项目**

### 部署

**回到你的项目页面，在 Deployments 点击 Redeploy 开始部署, 若没有 Error 信息即可打开域名进入初始化引导**

**当然，你也可以使用其他数据库如:PlanetScale，SupaBase，MongoDB等。参考**[原文档](https://oplog.cn/qexo/start/build.html)

## 配置

### GitHub

**这一步需要你把你的Hexo博客源文件上传到GitHub 如果部署中遇到问题, 可以访问 **[检查助手](https://hexoplusplus.cronfly.workers.dev/?step=start) 自检配置 仅支持Github, 若确认无误, 可检查仓库内是否有已经发布的文章。

**这里还需要一个token来让Qexo可以访问我们的仓库，于 **[GitHub设置](https://github.com/settings/tokens) 生成的 Token (建议使用 Classical) 需要 Repo & Workflow 下的权限 不建议给出所有权限。其他啥的就看[这个](https://oplog.cn/qexo/configs/provider.html)。

### Vercel

**VERCEL\_TOKEN** **您的 Vercel 账户密钥 在 **[此处](https://oplog.cn/qexo/configs/vercel.html) 生成

**PROJECT\_ID** **您 Qexo 部署所在项目的 ID 位于 Project Settings -> General -> Project ID🆔**

## 完成

**至此如果没有问题的话，你就可以正常的进入Qexo的管理界面了**

# Qexo的配置

## 图床配置（GitHub）

**我这边用的是GitHub图床**

![](https://github.com/djklmin/Picture/raw/main/Qexo/25/9/屏幕截图 2025-09-14 081536_6af1be139a99c837a1c4130972779b4c.png)

**(不建议)将图片上传至 Github 仓库以借助 Github Action 进行进一步操作**

### Github仓库

**您图片上传到的仓库**

`username/repo`

### 项目分支

**您图片需要上传仓库的分支**

`master`

### Github 密钥

**于 **[GitHub设置](https://github.com/settings/tokens)生成的 Token 需要 Repo 下的至少读取和写入权限 不建议给出所有权限

`wrq_P8sYPlYA9fjMlOPEYSKA84xxxxxxxxxxxxxx`

### 保存路径

**文件上传后保存的路径 包含文件名**

| **关键词** | **意义**           | **示例**                             |
| ---------------- | ------------------------ | ------------------------------------------ |
| *{year}*       | **当前年份**       | **21**                               |
| *{month}*      | **当前月份**       | **1**                                |
| *{day}*        | **当前日份**       | **2**                                |
| *{YEAR}*       | **当前年份**       | **2021**                             |
| *{MONTH}*      | **当前月份**       | **01**                               |
| *{DAY}*        | **当前日份**       | **02**                               |
| *{filename}*   | **无后缀的文件名** | **image**                            |
| *{time}*       | **时间戳**         | **1640186955.4339228**               |
| *{md5}*        | **文件 MD5-Hash**  | **0c8bfe6821a91c3d96b25e2ea2dcf827** |

### 自定义域名

**返回文件链接的 URL 最终返回的链接, 支持关键词同上**

[https://github.com/username/repo/raw/master/Qexo/](https://github.com/username/repo/raw/master/Qexo/){year}/{month}/{filename}\_{md5}.{extName}

# 完成✅

**如果没有问题的话，那现在就成了，你现在就可以正常的在Qexo里写✍🏻文章了！**
