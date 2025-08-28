---
title: vercel部署twikoo评论系统
categories:
  - 技术教程
tags:
  - hexo 
  - 网站
  - 博客管理
  - 教程
description: 这里填写文章摘要，Ayer主题依赖此字段显示预览。
date: 2025-08-25 13:14:41
updated: 2025-08-25 13:14:41
---

<!-- 文章正文开头... -->

<!--more-->

#  前言

本站评论系统曾一直使用Giscus，但是朋友们似乎大部分都没有GitHub账号，所以交流非常不方便，于是找到了[Twikoo](https://twikoo.js.org/)评论系统，部署过程参考本文

# 2 Twikoo简介

[Twikoo](https://twikoo.js.org/)是一个简洁、安全、免费的静态网站评论系统。

与waline相比，
优势：差不多；
不足：不支持IE，私有部署需要配置图床。

# 3 Vercel部署Twikoo评论系统

## 3.1 创建MongoDB Cloud数据库

**（1）添加User**
登录[MongoDB Cloud](https://cloud.mongodb.com/)官网（没账号需要先[注册](https://www.mongodb.com/cloud/atlas/register)），在`Database Access`页面点击`Add New Database User`创建数据库用户，`Authentication Method`选`Password`，在`Password Authentication`下设置数据库用户名和密码，用户名和密码可包含数字和大小写字母，不能包含特殊符号。点击`Database User Privileges`下方的`Add Built In Role`，`elect Role`选择`Atlas Admin`，最后点击`Add User`

**（2）添加Network Access**
在`Network Access`页面点击`Add IP Address`，`Access List Entry`输入`0.0.0.0/0`（允许所有IP地址的连接），点击`Confirm`

**(3) 获取数据库连接字符串**
在`Database`页面点击`Connect`，连接方式选择`Drivers`，记录数据库连接字符串，将连接字符串中的`<password>`修改为刚刚创建的数据库密码

## 3.2 Vercel部署Twikoo

**(1) 一键部署**
点击[**此处**](https://vercel.com/import/project?template=https://github.com/twikoojs/twikoo/tree/main/src/server/vercel-min)，一键部署到Vercel

**(2) 配置环境变量**
选择新建的Twikoo项目，进入`Settings -> Environment Variables`，添加环境变量`MONGODB_URI`，值为前面的MongoDB数据库连接字符串（注意替换`<Password>`）。

**(3) redeploy**
进入`Deployments`，进行`Redeploy`

等待重新部署完成后，进入`Project`，查看`Overview`或者点击`visit`，可以看见“Twikoo 云函数运行正常”的提示，部署成功

**(4) 绑定域名**
进入`Settings -> Domains`，在此处填写要绑定的域名，并在域名服务商配置中添加cname类型解析记录。

# 4 在Hexo Ayer主题中使用Twikoo（配置Twikoo前端）

## 4.1 修改主题配置文件

编辑主题配置文件，修改Twikoo评论相关配置，envId为部署的访问地址（或绑定域名），基于vercel部署`region`和`path`不必填写

```
twikoo:
  enable: true
  envId: ‘your twikoo url’
  region: 
  path: 
  lang: zh-CN
```

## 4.2 初始化Twikoo

启动Hexo，如果配置没有问题，在开启评论的页面可以看见Twikoo的评论界面，点击配置图案进行初始化配置

# 5 总结

一番折腾下来，我发现Twikoo还是存在亿点不足。通过Vercel部署的Twikoo不能上传图片，还需要自己配置图床（且支持的图床也不多），访问速度和流畅性也一般。
