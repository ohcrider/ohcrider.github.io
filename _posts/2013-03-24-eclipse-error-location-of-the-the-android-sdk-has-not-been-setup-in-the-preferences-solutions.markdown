---
date: 2013-03-24 14:24:15+00:00
layout: post
title: eclipse Android SDK 报错解决办法
category : lessons
tags : [ADT,Android,eclipse]
---

今天折腾android开发，eclipse要创建下Android Virtual Device，却报错Location of the Android SDK has not been setup in the preferences。<!-- more -->
解决办法：卸载重装ADT。
打开eclipse主界面 Help > Install New Software，地址填 https://dl-ssl.google.com/android/eclipse/
正常情况下，一路点击next应该没什么问题，但是由于伟大的GFW的存在，在线安装可能失败，小编我就悲催了。
下面说说离线安装ADT的办法：
下载离线包 http://dl.google.com/android/ADT-21.1.0.zip

前几步跟在线安装一样，Help > Install New Software，单击后弹出的Install界面中的“Add”按钮，在Name中输入任意名字，单击Archive找到下载的zip文件

这时候千万千万不要手贱急着安装，在进入安装之前一定要确保自己的电脑处于断网状态。小编在此之前，一直处于假死状态，由于是离线安装，忽略gfw的因素，网上找了下才晓得google在设计ADT安装的时候，如果采用离线安装方法但却使计算机联网，则自动采用在线安装方式进行安装，所以假死也就不奇怪了。

选择全部select all，一路点击next,在此过程中可能会提示别的错误，报错原因是因为eclipse的版本问题，忽略点击ok即可。

安装完毕重启eclipse。
