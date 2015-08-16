---
date: 2015-08-16 10:36:34+00:00
layout: post
title: Ubuntu ocserv搭建
---

最近换手机📱(iphone6)啦，以前是Android(LG L22 4.4.0)党。

Android上上推，用shadowsocks那是一个舒心。可是换了iOS，就没那么方便的自动切换代理了，比较普遍的是pac或apn。
pac就wifi下还说得过去，搞个树莓派什么的玩玩，也挺geek的，4G网络别想了。apn这货不是很安全，http代理那尿性也知道了＝＝。

后来发现`Cisco AnyConnect`，Cisco的VPN肯定比其他代理靠谱多了，要的就是安全、稳定与高效。另外一个好处就是，可以按需连接，不用全局开代理。全局就是国内的站点又绕了地球一圈，又回来，蛋疼＝＝。

要搭建AnyConnect的VPN，需要[ocserv](http://www.infradead.org/ocserv/download.html)。截止到今天，最新的版本是`0.10.7`，可以在官方的[changelog](http://www.infradead.org/ocserv/changelog.html)页面，找到版本相关信息。

ocserv的配置还是比较变态的，虽然官方的文档说得很清楚，但还是有点晕晕的，涉及方方面面的知识挺杂的。网上的中文教程也是质量不高，普遍的技术类的中文教程貌似都这样。怕自己以后忘了，或者也有同样想搭建ocserv的童鞋，所以纪录下。

以下教程基于:

    Ubuntu 14.04 x64
    ocserv 0.10.7

<!-- more -->

首先，你需要一个女朋友(大雾，不是，需要一台`Ubuntu 14.04 x64`的VPS。

就最近来说，digitalocean的速度好慢好慢🐌，新加坡或旧金山都慢出翔💩了，福州电信或联通是这样。
vultr东京🐔🏠的速度还不错。

有需要的童鞋，可以用我的邀请码，猛戳👉[http://www.vultr.com/?ref=6829224](http://www.vultr.com/?ref=6829224)。还是那么想要digitalocean，咱也有邀请码😒，猛戳👉[https://www.digitalocean.com/?refcode=bd778c035a7e](https://www.digitalocean.com/?refcode=bd778c035a7e)。

小广告打完了，不废话啦，开始正题。

准备工作
------------

####下载 ocserv 最新的包:

    wget ftp://ftp.infradead.org/pub/ocserv/ocserv-0.10.7.tar.xz

####解压

    tar -xf ocserv-0.10.7.tar.xz

####安装依赖

    apt-get install build-essential pkg-config libgnutls28-dev libwrap0-dev libpam0g-dev libseccomp-dev libreadline-dev libnl-route-3-dev

####编译&安装

    cd ocserv-0.10.7/
    ./configure
    make
    make install

####安装nginx(后续下载user.p12，需要用到)
    apt-get install nginx

证书相关
------------

####创建一个新的目录，放ocserv相关的配置文件、秘钥与证书
    mkdir /etc/ocserv
    cd /etc/ocserv

####创建 ca.tmpl
    cn = "fff" 
    organization = "fff" 
    serial = 1 
    expiration_days = 3650
    ca 
    signing_key 
    cert_signing_key 
    crl_signing_key

####生成 ca 秘钥与证书
    certtool --generate-privkey --outfile ca-key.pem
    certtool --generate-self-signed --load-privkey ca-key.pem --template ca.tmpl --outfile ca-cert.pem

####创建 server.tmpl，`111.111.111.111`替换成你自己VPS的ip
    cn = "111.111.111.111" 
    organization = "fff" 
    expiration_days = 3650
    signing_key 
    encryption_key
    tls_www_server

####生成 server 秘钥与证书
    certtool --generate-privkey --outfile server-key.pem
    certtool --generate-certificate --load-privkey server-key.pem --load-ca-certificate ca-cert.pem --load-ca-privkey ca-key.pem --template server.tmpl --outfile server-cert.pem

####创建 user.tmpl, `uid`这个很多教程都忽略了，没这个，证书验证登陆就不能用了，这边自己也是浪费了好多时间。
    cn = "fff"
    unit = "fff"
    uid = "fff"
    expiration_days = 3650
    signing_key
    tls_www_client

####生成 user 秘钥与证书
    certtool --generate-privkey --outfile user-key.pem
    certtool --generate-certificate --load-privkey user-key.pem --load-ca-certificate ca-cert.pem --load-ca-privkey ca-key.pem --template user.tmpl --outfile user-cert.pem

####将证书转换为 PKCS12，会提示输入两次密码，随便输，一样就可以咯。待会iOS客户端导入证书的时候，会提示输入密码，这个密码就是现在要输的密码。
    openssl pkcs12 -export -inkey user-key.pem -in user-cert.pem -certfile ca-cert.pem -out user.p12

####将生成好的user.p12，拷贝到nginx的http服务目录，方便下载
     cp user.p12 /usr/share/nginx/html

####拷贝默认配置文件
    cp ~/ocserv-0.10.7/doc/sample.config config

####证书配置相关说明
    fff 是神马，它是一个很神秘的组织，每个人都举着火把🔥。
    expiration_days 是证书过期的时间，时间单位：天。


配置相关
------------

####修改 config，auth改为证书认证的方式，注释掉其他 `auth =`开头的
    auth = "certificate"

####配置 server 秘钥与证书
    server-cert = /etc/ocserv/server-cert.pem
    server-key = /etc/ocserv/server-key.pem

####配置 ca 证书
    ca-cert = /etc/ocserv/ca-cert.pem

####配置端口号
    tcp-port = 2333
    udp-port = 2333

####修改dns
    dns = 8.8.8.8
    dns = 8.8.4.4

####确保以下两个都是 true，貌似默认就是了
    try-mtu-discovery = true
    cisco-client-compat = true

####修改route，咱这边是都注释掉，按需修改。可以参考 kevinzhow 童鞋的[配置](https://gist.github.com/kevinzhow/9661732)。

####修改no route，咱这边是保持默认配置，这个添加完，貌似就不走代理，不过客户端那边也可以配置，就没去动它，按需修改

####修改/etc/sysctl.conf，把下面注释去掉
    net.ipv4.ip_forward=1

####重新加载下，让 /etc/sysctl.conf 生效
    sysctl -p /etc/sysctl.conf

####打开 TCP 和 UDP 端口，比如刚才的端口是`2333`，那么现在也要是`2333`
    iptables -t filter -A INPUT -p tcp -m tcp --dport 2333 -j ACCEPT
    iptables -t filter -A INPUT -p udp -m udp --dport 2333 -j ACCEPT
    iptables -t nat -A POSTROUTING  -j MASQUERADE

####debug模式打开
    ocserv --config=/etc/ocserv/config -f -d 1

####查看端口占用，比如查看`2333`端口
    lsof -i:2333

####干掉占用端口的进程，假设刚才占用`2333`端口的pid是`12345`
    kill 9 12345

iOS客户端配置
------------

####安装Cisco AnyConnect
App Stroe地址[https://itunes.apple.com/us/app/cisco-anyconnect/id392790924](https://itunes.apple.com/us/app/cisco-anyconnect/id392790924)

####导入证书
诊断 > 证书 > 导入用户证书，会提示你输入URL，记得加`http://`，假设你的VPS的ip 是 `111.111.111.111` ,拷贝到nginx目录的是user.p12，就应该输入 `http://111.111.111.111/user.p12` 

####添加连接
连接 > 添加VPN连接

说明，随便填

服务器地址，假设你的VPS的ip 是 `111.111.111.111`，端口是 `2333`，那么就是 `111.111.111.111:2333`，这边就不需要前面加`http://`了。

高级 > 证书，选择你刚才导入的那个证书

高级 > 按需连接，打开，出现 域列表，永不连接 那边可以添加一下常用的国内站点

####设置
设置 > 阻止不信任的服务器，这个关掉，不然使用自己颁发的证书会有问题

设置 > VPN FIPS模式，这个打开，貌似会比较稳定，心里作用吧(¬_¬)

搞定
------------