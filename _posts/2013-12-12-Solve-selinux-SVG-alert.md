---
layout: post
category : linux
title:  "解决 selinux SVG警报"
date: 2013-12-12 05:20:22 
tags : [ fedora , selinux ]
---
一直被selinux折磨，知道启用它是比较安全，也就没打算关掉，但是也因此多了很多蛋疼的问题。
<!-- more -->

SELinux即Security-Enhanced Linux，查了下维基，很nb的赶脚，引用下：


“	国家安全局安全增强式Linux是一组给Linux核心的补丁，并提供一些更强、更安全的强制访问控制架构来和核心的主要子系统共同运作。基于机密及完整性原则，它提供一个架构来强制信息的分离，以对付入侵的威胁或任何企图略过安全架构的应用程序。借此限制恶意或设计不良的程序可能造成的破坏。它包含一组安全性原则组态设置档的范本以符合一般的安全性目标。	”
 &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;   ——美国国家安全局 安全增强式Linux小组

每次更新完内核，系统就跳出来一个或N个SVG警报，这次貌似是Bumblebee引起的。它给你的解决办法是：

<pre class="prettyprint linenums">
您应该将这个情况作为 bug 报告。
您可以生成本地策略模块允许这个访问。
请执行以下命令此时允许这个访问：
# grep bumblebeed /var/log/audit/audit.log | audit2allow -M mypol
# semodule -i mypol.pp
</pre>

就是说以root权限执行下面命令，这样就不会报错了。

<pre class="prettyprint linenums">
grep bumblebeed /var/log/audit/audit.log | audit2allow -M mypol
semodule -i mypol.pp
</pre>

可是执行完`grep bumblebeed /var/log/audit/audit.log | audit2allow -M mypol`，就提示：

<pre class="prettyprint linenums">
compilation failed:
sh: /usr/bin/checkmodule: 没有那个文件或目录
</pre>

再接着执行`semodule -i mypol.pp`，提示：

<pre class="prettyprint linenums">
semodule:  Failed on mypol.pp!
</pre>

安装`selinux-policy-devel.noarch`即可。

<pre class="prettyprint linenums">
yum install selinux-policy-devel
</pre>

安装完后，再次执行：

<pre class="prettyprint linenums">
grep bumblebeed /var/log/audit/audit.log | audit2allow -M mypol
semodule -i mypol.pp
</pre>

这次成功了，提示：

<pre class="prettyprint linenums">
[root@localhost fewspider]# grep bumblebeed /var/log/audit/audit.log | audit2allow -M mypol
******************** IMPORTANT ***********************
To make this policy package active, execute:

semodule -i mypol.pp

[root@localhost fewspider]# semodule -i mypol.pp
[root@localhost fewspider]# 
</pre>

这样就搞定了，以后由其他软件引起的SVG警报，也可以这样解决。