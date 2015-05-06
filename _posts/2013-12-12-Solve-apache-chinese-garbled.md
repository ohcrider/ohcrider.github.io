---
layout: post
category : linux
title:  "解决apache中文乱码"
date: 2013-12-12 19:45:33 
tags : [ fedora , apache ]
---
以前没留意apache中文乱码的问题，文件夹和文件都喜欢用英语的形式，没出什么问题。今天拷贝别人的源码进行学习，目录和文件有些是中文的，就出现了蛋疼的乱码。
<!-- more -->

fedora apache的配置文件路径为`/etc/httpd/conf/httpd.conf 
`，很简单，只要在最后面添加一行：

<pre class="prettyprint linenums">
IndexOptions Charset=UTF-8
</pre>

重启下apache：

<pre class="prettyprint linenums">
apachectl restart
</pre>

这样就没问题了。