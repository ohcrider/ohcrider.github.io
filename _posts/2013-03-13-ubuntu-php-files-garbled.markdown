---
date: 2013-03-13 06:03:36+00:00
layout: post
title: Ubuntu php文件 乱码
category : linux
tags : [Apache,php]
---

炎炎夏日，难得心情如此美好，打算学点php，在第一个hello world的php文件中就出现了蛋疼的乱码，情何以堪呐。

起先是以为VIM，或者gedit的问题，未曾想到是Apache的问题。居然是她欺骗了小编的感情，当然得调教下，哼。<!-- more -->

打开终端

<pre class="prettyprint linenums">
sudo gedit /etc/apache2/apache2.conf
</pre>

在最后面添加

<pre class="prettyprint linenums">
AddDefaultCharset UTF-8
</pre>

重启下

<pre class="prettyprint linenums">
sudo /etc/init.d/apache2 restart
</pre>

刷新下，搞定
