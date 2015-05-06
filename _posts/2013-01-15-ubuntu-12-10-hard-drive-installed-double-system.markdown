---
date: 2013-01-15 07:12:19+00:00
layout: post
title: Ubuntu 12.10硬盘安装 双系统
category : linux
tags : [EasyBCD,ubuntu,win7]
---

本教程为win7环境，准备两个东西EasyBCD软件和iso镜像。
iso镜像 [http://www.ubuntu.org.cn/](http://www.ubuntu.org.cn/) 32位、64位随意。<!-- more -->

先给ubuntu准备个空间，硬盘腾出至少30g，删除分区。

EasyBCD软件设置：
Add Entries选NeoGrub 然后点Install NeoGrub点Save ，接着是Configure，
编辑这个文件，复制以下代码，粘贴。

<pre class="prettyprint linenums">
title Install Ubuntu
root (hd0,0)
kernel (hd0,0)/vmlinuz boot=casper iso-scan/filename=/1.iso ro quiet splash locale=zh_CN.UTF-8
initrd (hd0,0)/initrd.lz
</pre>

下载好的iso镜像文件，解压打开casper文件夹，复制initrd.lz和vmlinuz到C盘，再把iso镜像文件也拷贝到C盘。
1.iso为下载的镜像文件名，根据你的文件名适当修改，怕造成不必要的麻烦，可以像小编这样，改成简单点的名字。

重启下，就可以看到 启动菜单 里面多了一项，选择新增的那一项，等待一会，就进入ubuntu界面。

别手贱急着安装，取消掉对光盘所在驱动器的挂载，否则分区界面找不到分区，Ctrl+Alt+T打开终端，输入代码:

<pre class="prettyprint linenums">
sudo umount -l /isodevice
</pre>

开始安装，选择中文，选择其他选项，找到之前分配好的空间，创建新分区，小编默认是91G空闲
/ 30G ext4
/boot 200M ext4
/home 60G ext4
SWAP 2G
安装启动引导器的设备 选择/boot所在分区编号

最后进入Window7，打开EasyBCD删除安装时改的menu.lst文件，按Remove即可。

然后去我们的c盘 删除vmlinuz，initrd.lz和系统的iso文件。

打开easyBCD，选择add new entry, 选择linux/BSD, name这一行随便填写，只是系统名词，写Ubuntu吧，Device这一行选择刚刚我们创建的200MB的那个”/boot“分区,前边有linux标记的。

重启下，试试，选择相应的启动项，就可以进入对应的系统。
