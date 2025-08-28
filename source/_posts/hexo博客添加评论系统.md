---
title: hexo博客添加评论系统
categories:
  - 技术教程
tags:
  - 博客管理
description: 这里填写文章摘要，Ayer主题依赖此字段显示预览。
date: 2025-08-23 13:37:04
updated: 2025-08-23 13:37:04
---

<!-- 文章正文开头... -->

<!--more-->

# hexo博客添加评论系统

在Hexo框架下的博客有很多种实现评论系统的方式。我这里采用了Giscus实现评论系统，这是利用[GitHub Discussions](https://docs.github.com/en/discussions)实现的评论系统，优点包括但不限于： - 开源、无广告、永久免费 - 无需自建数据库（数据储存在项目仓库的Discussions中） - 用户通过GitHub账户登录，简化注册流程，也增强了评论者的身份可信度、便于评论的及时回复与管理 - 支持自定义主题样式、评论排序、过滤等功能 - 配置简单，几分钟就能搞定

### 安装

进入在GitHub账户中对Giscus的[安装界面](https://github.com/apps/giscus)点击install进行安装。

### [官网](https://giscus.app/zh-CN)配置

选择一个GitHub仓库用于储存评论数据，可以是博客项目仓库，也可以是专门用于储存评论数据的仓库。但要确保仓库满足3个条件：

1. 该仓库是**公开的**，否则访客将无法查看评论信息；

2. giscus app 已安装，否则访客将无法评论和回应（上一步已完成这一条件）；

3. Discussions 功能**已在你的仓库中启用**。 进入对应的仓库，点击右上角的 `Settings`，往下翻到`Features`，勾选`Discussions`。

   输入仓库（用户名/仓库名）后，系统会提示你该仓库是否满足所有条件

   > 有个小细节，我逐字母输入这个空的时候明明该仓库符合所有条件它还是会显示不可以使用，但我直接复制粘贴仓库地址时它就显示可以使用了。不知道算不算一个bug

   后面有一些个性化设置，比如： - 【页面 <-> Discussion映射关系】 这个决定你用于存储评论数据的仓库中Discussion如何分类显示，以及giscus如何筛选仓库Discussion中该页面的信息显示在网页上。如果使用`pathname`而你的博客标题是中文的话，Discussion界面会显示一串很长的码，不易分辨来自哪篇帖子。**所以这里我选择了`title`，这样Discussion标题里的中文是可以正常显示的。** - 【Discussion分类】 建议选择`Announcements`，并勾选下面的“只搜索该分类中的discussion” - 【特性】 建议勾选“启用主帖子上的反应（可以给博客文章贴表情）”“将评论框放在评论上方”和“懒加载评论（评论的加载将延迟到用户滚动到评论容器附近，有助于博客界面的快速加载，是一种前端显示的优化手段）” - 【主题】 建议勾选“用户偏好的色彩方案”，这个随意

   ### 启用giscus

   完成上述设置之后，下面会自动生成对应的javascript代码。比如：

   ```
   <script src="https://giscus.app/client.js"
           data-repo="jachinzhang1/jachinzhang1.github.io"
           data-repo-id="R_kgDONy_q0w"
           data-category="Announcements"
           data-category-id="DIC_kwDONy_q084Cmo0P"
           data-mapping="title"
           data-strict="0"
           data-reactions-enabled="1"
           data-emit-metadata="0"
           data-input-position="top"
           data-theme="preferred_color_scheme"
           data-lang="zh-CN"
           data-loading="lazy"
           crossorigin="anonymous"
           async>
   </script>
   ```

   

如何应用于博客上的方式应该是因博客主题而异的，可以参考主题的使用文档（大多数可能是需要在**对应主题**的配置yml文件中设置的）。

完成这些配置之后重新生成网页文件，应该就可以看到评论系统了。访客通过GitHub账号登录即可评论。来自本地服务器预览和域名访问的评论都会实时在仓库的Discussions中显示，并会通过邮件提醒仓库的所有者。~~所以拒绝恶意刷屏从你我做起~~

