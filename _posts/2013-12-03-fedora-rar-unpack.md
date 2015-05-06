---
layout: post
category : lessons
title:  "fedora rar解压"
date: 2013-12-03 11:31:37 -0700
tags : [ linux , unrar ]
---
本来以为fedora自带rar解压的，没想到居然没有。
<!-- more -->

<pre class="prettyprint linenums">
su -c 'yum localinstall --nogpgcheck http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm'
</pre>

<pre class="prettyprint linenums">
su -c 'yum localinstall --nogpgcheck http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm'
</pre>

<pre class="prettyprint linenums">
sudo yum install unrar
</pre>

安装完就可以直接用ark解压rar文件了，或者用`unrar`的命令解压。