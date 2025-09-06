---
title: YDpen的adb密码修改
categories:
  - 技术教程
tags:
  - 有道词典笔
  - 破解
  - ADB
  - 教程
  - 科技
date: 2025-08-21 17:49:03
updated: 2025-08-21 17:49:03
description: 一篇详尽的教程，指导如何通过修改ADB密码来破解有道词典笔。 # <--- 这就是摘要！
typora-root-url: ..
---

## 前言

有道词典笔早期好像使用的是安卓系统，但后面出的笔都不是安卓系统，而是基于Linux的词典笔OS。故即使开启有道词典笔的ADB依然无法实现安装APK等功能，仅限折腾着玩玩罢了。

**⚠️ 操作有风险，玩机需谨慎**
因任何操作造成的包括但不限于变砖、炸App等损失作者均不承担任何责任，也没有义务帮你修复。如有侵权联系删除。

## 基础知识

有道词典笔一直都带有ADB开启入口，只需多次点击"法律监管"中的文本即可打开。

## 破解方案

本文采用大佬SkySight-666的方案加以改进，靠中间人攻击劫持更新请求从而替换更新包。

**参考链接：**
- https://github.com/orgs/PenUniverse/discussions/250
- https://github.com/orgs/PenUniverse/discussions/277

**本文用到的全部工具：**

https://www.123684.com/s/sE1hjv-mklwd 提取码:0m8B

## 详细步骤

### 首先，通过抓包抓取系统全量包

使用词典笔连接电脑热点，启用wireshark对热点所在连接进行抓包，词典笔检查更新，在wireshark中找到post请求，抓到后可以停止抓包。

![](/images/2.png)

### 重新发送更新请求，获取全量包链接

找一个HTTP测试网站，这里我用的是SOJSON，将Header设置为，将你在获得的数据填入，发送如下请求：

请将以下JSON数据用于HTTP请求：

```
json
{
    "timestamp": "这里你Wireshark获得的timestamp",
    "sign": "这里你Wireshark获得的sign",
    "mid": "这里你Wireshark获得的mid", 
    "productId": "这里你Wireshark获得的productID",
    "version": "99.99.90",
    "networkType": "WIFI"
}
```

![](/images/3.png)

请求完毕我们会获得一个包含完整包链接的json

````
```json
{
   "status": 1000,
   "msg": "success",
   "data": {
      "releaseNotes": {
            "publishDate": "2023-06-26",
            "version": "99.99.91",
            "content": "[{\"country\":\"zh_CN\",\"content\":\"1.优化系统.修复错误\"}]"
      },
      //"sha256": "xxxxxxxxxx",
      "safe": {
            "encKey": null,
            "isEncrypt": 0
      },
      "version": {
            "segmentMd5": "[{\"num\":0,\"startpos\":0,\"md5\":\"6afb51af609d5ab205620f2020ed964e\",\"endpos\":104857600},{\"num\":1,\"startpos\":104857600,\"md5\":\"42c6e6b88c0603783765c403b0ed7914\",\"endpos\":209715200},{\"num\":2,\"startpos\":209715200,\"md5\":\"a2d297d5cc33eca65777d2bdcbe98293\",\"endpos\":314572800},{\"num\":3,\"startpos\":314572800,\"md5\":\"5bb85fc4e9539131ff471cf7e1488718\",\"endpos\":419430400},{\"num\":4,\"startpos\":419430400,\"md5\":\"4c5f5f95d49719a23aef3d127f884c1f\",\"endpos\":524288000},{\"num\":5,\"startpos\":524288000,\"md5\":\"b6028cbf53490ff8a72d6b03da64bfdb\",\"endpos\":629145600},{\"num\":6,\"startpos\":629145600,\"md5\":\"4f6d7a683825afdb57291c651fcf0a4c\",\"endpos\":734003200},{\"num\":7,\"startpos\":734003200,\"md5\":\"51441a5ab6fc37076104de26d8d74092\",\"endpos\":838860800},{\"num\":8,\"startpos\":838860800,\"md5\":\"2f282b84e7e608d5852449ed940bfc51\",\"endpos\":943718400},{\"num\":9,\"startpos\":943718400,\"md5\":\"4c48a4078df31327fda7845123a4cb2b\",\"endpos\":1048576000},{\"num\":10,\"startpos\":1048576000,\"md5\":\"2f282b84e7e608d5852449ed940bfc51\",\"endpos\":1153433600},{\"num\":11,\"startpos\":1153433600,\"md5\":\"2f282b84e7e608d5852449ed940bfc51\",\"endpos\":1258291200},{\"num\":12,\"startpos\":1258291200,\"md5\":\"c81029b9c4e0ecf7cbcf1d1afb881f20\",\"endpos\":1363148800},{\"num\":13,\"startpos\":1363148800,\"md5\":\"586c523c54bc9f1042bb92022ac87183\",\"endpos\":1397088268}]",
            "bakUrl": "http://iotdownbak.mayitek.com/xxxxxxxxxx/xxxxxxx/5383b000-49c2-4d29-812e-42c52b075599.img",
            "versionAlias": "",
            "deltaUrl": "http://iotdown.mayitek.com/xxxxxxxxxx/xxxxxxx/5383b000-49c2-4d29-812e-42c52b075599.img",
            "deltaID": "xxxxxxx",
            "fileSize": 1397088268,
            "md5sum": "5c668394fa2779eada86601292ff877b",
            "versionName": "99.99.91",
            "sha": "6fdd26798679e5cb1e877051c7970a89307e303"
      },
      "policy": {
            "download": [
               {
                  "key_name": "wifi",
                  "key_message": "仅wifi下载",
                  "key_value": "optional"
               },
               {
                  "key_name": "storageSize",
                  "key_message": "存储空间不足",
                  "key_value": "1397088268"
               },
               {
                  "key_name": "forceDownload",
                  "key_message": "",
                  "key_value": "false"
               }
            ],
            "install": [
               {
                  "key_name": "battery",
                  "key_message": "电量不足，请充电后重试！",
                  "key_value": "30"
               },
               {
                  "key_name": "rebootUpgrade",
                  "key_message": "",
                  "key_value": "false"
               },
               {
                  "key_name": "force",
                  "key_message": "",
                  "key_value": "{\"from\": \"00:00\", \"to\": \"00:00\",\"gap\": \"00:00\"}"
               }
            ],
            "check": [
               {
                  "key_name": "cycle",
                  "key_message": "",
                  "key_value": "1500"
               }
            ]
      }
   }
}
```
````

应该类似于以上这个文本 通过bakUrl或deltaUrl链接下载文件

## 使用winhex替换md5值

​    打开winhex并打开你的完整包img，开启搜索，搜索

```
echo $PASSWD | md5sum
```

![](/images/4.png)

​    千万注意，这里有一个网易挖的坑！！这边代码用的echo会在你输入密码之后加一个换行符 导致密码md5改变 最终校验失败这也是大部分升级成功却依旧密码错误的原因之一！因此我们需要想办法在自己的密码转为md5前也加上换行符。
​    总之我们把带换行符一起转换的md5用来替换原img中的md5 然后保存文件

注意：此时文件大小未发生改变 大小一个字节也没变！

## 计算修改后的文件校验码

   编辑getnewmd5.py，使得segment_sizes数组中的值为前面抓包抓到的每一个endpos的值，有多少就加多少，

   

每个机器值可能是不一样多的，然后在cmd中执行'python getnewmd5.py {修改后的img路径}'，并紧跟着执行'certutil -hashfile {修改后的img路径} md5',
   随后我们会获得分片md5和整体md5

   还需要计算一个img的sha256值 得到修改后的img的sha256值 留存备用

## 搭建更新服务器

   首先自行安装nodejs 然后编辑YDPen.js，将"JsonData"的内容全部替换为前面抓包抓到的内容，然后手动修改'segmentMd5'中每一个分块的md5值为前面计算得到的md5值，并修改bakUrl和deltaUrl为"http://{本机局域网ip}:14514/你修改的完整包.img"，随后修改'md5sum'为前面计算的完整img的md5，sha修改为计算的sha256值

  下拉到js下方部分，修改'/product/1717746496/*********/ota/checkVersion'为你自己抓到的请求url，保存文件。

<img src="/images/5.png" style="zoom:80%;" />

![](/images/6.png)

## 更新自定义固件

在词典笔连接电脑热点的情况下检查更新，会检测到一个很大的更新包，直接更新即可

**获得adb权限，美美折腾

更新完毕后，待设备重启，再次去法律监管里面连击打开adb，此时连接电脑执行adb shell auth并输入前面转换为md5的密码明文，回车，见证奇迹

**教程结束
   本文转载于bilibili听秋念大佬的文章https://www.bilibili.com/opus/1041644000127221764?spm_id_from=333.1387.0.0
   本文只是加以改进

**结束！