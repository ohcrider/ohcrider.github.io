---
layout: post
category : lessons
title:  "解决KDE回收站已到达其最大容量"
date: 2014-04-24 10:22:02 
tags : [ KDE , Fedora ]
---
最近下载的文件有点多，事后整理发现很多东西没用，删除居然提示：回收站已到达其最大容量！请手动清理回收站。
<!-- more -->

把回收站的东西都删了，还是提示那样。原因是`~/.local/share/Trash/metadata`文件中`Size`的数值太大，把那个文件删了就没事了（当然最好先备份下！