---
date: 2012-11-09 15:38:52+00:00
layout: post
title: 解决dns污染，goagent抽风
category : lessons
tags : [goagent]
---

刚刚测试了下，针对Google的泛域名DNS投毒污染貌似已经解除， goagent google_hk https 也差不多恢复正常，还没恢复的童鞋，可以用下面的方法应急下。
<!-- more -->
打开goagent\local目录下的proxy.ini，以记事本的方式打开编辑，替换掉原来的hosts。

<pre class="prettyprint linenums">
[google_cn]
mode = https
hosts = 74.125.128.160|74.125.128.161|74.125.128.162|74.125.128.163|74.125.128.164|74.125.128.165|74.125.128.166|74.125.128.167
</pre>

保存后，重新打开goagent，一切正常，斯巴达style。
