---
layout: post
category : linux
title:  "Fedora19更新错误"
date: 2013-08-05 04:11:17 -0700
tags : [ fedora ]
---
今天更新fedora19，出现了一堆错误。
<!-- more -->

<pre class="prettyprint linenums">
错误：软件包：abrt-2.1.6-2.fc19.x86_64 (updates)
          需要：satyr >= 0.5
          可用: satyr-0.3-2.fc19.i686 (fedora)
              satyr = 0.3-2.fc19
          可用: satyr-0.4-1.fc19.i686 (updates)
              satyr = 0.4-1.fc19
错误：软件包：libreport-2.1.6-2.fc19.x86_64 (updates)
          需要：satyr >= 0.5
          可用: satyr-0.3-2.fc19.i686 (fedora)
              satyr = 0.3-2.fc19
          可用: satyr-0.4-1.fc19.i686 (updates)
              satyr = 0.4-1.fc19
</pre>

到fedora论坛逛了下，发现别人也是如此。

解决办法：

需要安装以下的这些包，才可以正常更新。

[http://kojipkgs.fedoraproject.org/packages/satyr/0.5/2.fc19/x86_64/](http://kojipkgs.fedoraproject.org/packages/satyr/0.5/2.fc19/x86_64/)

再次`yum update`，一切正常。