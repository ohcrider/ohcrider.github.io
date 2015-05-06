---
date: 2012-10-11 09:56:55+00:00
layout: post
title: 搭建gae，Android和pc应用
category : lessons
tags : [Android,goagent]
---

时常可以听到facebook、twitter、youtube，可是却打不开。难道互联网，不是互联的，你玩了那么久的网络，到头来只是在中国这个局域网，多无趣啊。<!-- more -->墙外有好多优秀的网络应用，不接触可惜了。什么是墙，为什么打不开那些网页，在此略过一千万字，自行google。ps：大虾请灰过，勿吐槽

1、打开[Google App Engine](https://appengine.google.com/)，用google账号登录，没有的话，临时注册一个

2、注册 Google App Engine 的帐号，在此过程中需要短信验证码

注册成功

3、创建一个应用

应用创建成功

4、打开[goagent项目主页](https://code.google.com/p/goagent/)，下载最新版本的

5、解压下载的附件，修改`/local/proxy.ini`文件，以记事本的方式打开，修改`appid = goagent` 这一行，将`goagent`替换成你之前申请的应用的名字

6、运行`/server/uploader.bat` ，依次输入应用名字、gmail及密码，上传

7、上传成功，打开[Google App Engine](https://appengine.google.com/)，可以看到Current Version状态变了，看截图圈圈

到此gae就搭建成功了，可以进入下一步

Android端：
1、下载gae代理，修改代理地址，默认是"https://proxyofmax.appspot.com/fetch.py",将"proxyofmax"改为你的应用的名字,勾选全局代理，打开代理开关，就搞定了

pc端：
1、下载chrome，安装Proxy SwitchySharp插件，SwitchySharp 选项中，选择导入/导出，在线恢复备份http://goagent.googlecode.com/files/SwitchyOptions.bak

如果出现证书错误，自己导入`/local/CA.crt`
