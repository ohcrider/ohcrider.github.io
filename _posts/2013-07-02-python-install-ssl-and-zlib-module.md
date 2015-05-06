---
layout: post
category : linux
title:  "python安装ssl和zlib模块"
date: 2013-07-02 18:01:13 -0700
tags : [goagent , fedora , python ]
---
更新了最新版的goagent，发现要python3.3才可以。于是马上灰过去更新了，又提示需要ssl模块和zlib模块。
安装ssl模块和zlib模块蛮简单的，其中需要用到OpenSSL，我的环境是fedora19。
<!-- more -->

先安装OpenSSL：

<pre class="prettyprint linenums">
 yum install openssl-devel
</pre>


然后到   <a href="http://www.python.org/download/" target="_blank">python</a>  的下载页面，下载压缩包。

解压，找到该目录下的`Modules/Setup.dist`。

找到类似下面的语句，把前面的注释去掉：

<pre class="prettyprint linenums">
# Socket module helper for SSL support; you must comment out the other
# socket line above, and possibly edit the SSL variable:
SSL=/usr/local/ssl
_ssl _ssl.c \
	-DUSE_SSL -I$(SSL)/include -I$(SSL)/include/openssl \
	-L$(SSL)/lib -lssl -lcrypto
</pre>

还有这边：

<pre class="prettyprint linenums">
# Andrew Kuchling's zlib module.
# This require zlib 1.1.3 (or later).
# See http://www.gzip.org/zlib/
zlib zlibmodule.c -I$(prefix)/include -L$(exec_prefix)/lib -lz
</pre>

重新编译安装：

<pre class="prettyprint linenums">
./configure
make &amp;&amp; make install
</pre>

再运行goagent的话，一切正常<(￣︶￣)/ 。