
## 前言

尽可能避免使用 bash 进行编程，如果必须编程，使用 python 进行更高效、更稳健的编程。

本文档为基础 bash 命令的扩展用法，面向的受众是有一定的 bash 使用基础的用户。

命令不一定适用于 MacOS，用者自测。

#### 文本处理命令

```bash

# 利用cat合并多个二进制文件
cat 1 2 3 4 > whole.file

{
    # 查找文本中的多个字符串，并排除某个字符串
    grep -e '\bimport\b' -e '\bdef\b' server.py|grep -v '\bfrom\b'

    # 从多个文件中查找指定字符串, 额外显示和它的后 5 行 (相邻的行会被合并)
    grep -r '\bdef ' *.py -A5

}

# 输出文件尾部最后100行,并实时更新
tail -fn 100 filename.log

# 跳过开始的100行
tail -n +100 filename.log

# 寻找所有可打印的字符串(连续4个字符以上)
strings -4 /bin/ls | less

# tr 替换字符，全部大写转为小写
cat 1.txt | tr A-Z a-z

# 统计文本数据 (输出：行数 字符数 字节数 最长行的字数)
wc -lmcL *.py

```

#### 常用命令

```bash

{
    # python 单线程简易文件服务器
    python -m SimpleHTTPServer 8080
    python -m http.server 8080
}

# 重定向忽略所有输出（1=正常句柄, 2=错误句柄，后面字符是 > 会引起句柄重定向）
echo hello > /dev/null 2>&1

# nohup 实时记录 python 的输出
stdbuf -o0 nohup python -u app.py >nohup.out 2>&1 &

{
    # 递归所有子目录查找文件内容
    find '/tmp' |xargs grep -r 'import' {}

    # 递归删除目录下所有 .pyc 文件
    find . -type f -name "*.pyc" -exec rm -f {} +
}


find . -type f | xargs -I{} rm -rf \'{}\'

# 计算 md5
md5sum -t filename.zip

{
    # 用yum安装程序包
    yum -y install sublime-text-2

    # 查看命令属于哪个包
    yum search fuser
    yum whatprovides fuser

    # rpm 包管理
    rpm -qa subversion
}

{
    # tar/gz 操作
    # 打包
    tar cf trunk.tar *

    # 静默解压到指定目录 (不能自动创建目录)
    tar xf filename.tar.gz -C /targetdir/

    # 合并解压
    cat tar-file-00? | tar zx -C /targetdir/

    # zip 操作
    # 静默解压
    unzip -q filename.zip -d /tmp

    # 打包（递归子目录）
    zip -rq trunk.zip *

    # 将文件分开打包成每个 20m 的压缩包，0：不压缩
    zip -0rqs 20m split_20m *

    # 将分开的zip文件还原
    zip -q --fix split_20m --out tmp.zip && unzip tmp.zip
}

# 进程树 高亮 PID=10086 的进程:
pstree -anpH10086

# 赋予 rwx (4+2+1) 权限
chmod 0777 ./1.py

{
    # 查看系统限制
    ulimit -a
    # 修改系统限制
    ulimit -n 10240
}

# 查询网站信息
dig @8.8.8.8 w.baidu.com

{
    # 快速备份目录
    cp -r trunk{,_bak}

    # 利用{}行内循环（不能有空格）
    echo a{11,22,3{4,5}}b
    : "a11b a22b a34b a35b"

    # 循环
    for i in {1..9}; do curl w.baidu.com; done
    for ((i = 0; i < 10; i++)); do echo $i; done

    # 包含变量的写法：
    {
        for i in $( eval echo {1..$(sysctl -n hw.ncpu)} ); do echo $i; done;
        for i in $( seq 1 $(sysctl -n hw.ncpu) ); do echo $i; done;
        for (( i = 1; i <= $(sysctl -n hw.ncpu); i++ )); do echo $i; done;
    }

    # 无限循环：
    while (true); do echo 1; done

    # 批量重命名
    for f in *.jpg; do mv $f{,.png}; done

    # 批量后台运行（多线程）
    for i in {1..5}; do echo $i >> for.log & done
    for i in {1..5}; do { echo $i >> for.log && echo $i$i >> for.log ; } & done
}

{
    # 获取一个32位长度的随机字符串
    openssl rand -base64 24
    openssl rand -hex 16
}

# 忽略所有环境设置执行指定命令
env -i "bash"

# 播放音频文件
aplay music.wav

# 使用 tcpdump 抓包
tcpdump tcp dst ayiis.me 443 and tcp dst ayiis.me 80

{
    # 统计指定文件大小
    du -sh /opt/*

    # 统计指定分区的使用情况
    df -h /dev
}

{
    # 利用 ping 获取子网主机 (ping 广播地址)
    ping 192.168.15.255 -t 1

    # 查看网关
    # 列出所有网关
    netstat -rn

    route -n get default

    route -n get www.baidu.com
}

# 查找软链接的最终指向
readlink -f /usr/local/bin/python

```

#### 用户管理

```bash

{
    # 新建用户ayiis
    useradd -g deploy ayiis
    # 新建用户ayiis，主组deploy，副组root
    useradd -s /bin/sh -g deploy -G root ayiis

    # 修改用户密码
    passwd ayiis
    # 修改用户组 - 单个组
    usermod -g deploy ayiis
    # 修改用户组 - 多个组
    usermod -G deploy,root ayiis
}

# 修改 文件/目录 的 拥有者/组
chown -R ayiis:deploy /tmp/dir

{
    # 切换用户 并使用目标用户的环境变量
    su - ayiis

    # 用指定用户身份和用户环境执行命令
    su - ayiis -c "service sleep100 start"
}

{
    # 清空历史命令（不影响其他用户的活动 shell）
    echo > ~/.bash_history
    history -c
}

{
    # 查询所有 SHELL 的使用者
    who -am
    # 中止 SHELL 进程，可以踢出 SSH 到 SHELL 其他用户
    kill -9 1024
}

```

#### 上传下载

```bash

{
    # wget下载文件
    wget w.a.com/1.tar.gz -O 1.tar.gz

    # curl下载文件到指定路径
    curl w.a.com/1.tar.gz -so 1.tar.gz

    # 指定解析IP / 发送 Headers
    curl -v --http1.1 -H"accept-encoding:gzip" -H"range:bytes=0-44" --resolve w.a.com:443:1.2.3.4 "https://w.a.com/edu.max.js"
}

# 传文件夹或多个文件，并指定 40901 为 ssh 端口
scp -rP40901 /src/ centos:/tmp

# 压缩文件并发送到远程
tar cz filename | ssh username@hostname "tar xz -C /path"

# 用rsync通过ssh下载文件
rsync -av -P -e "ssh -p 40901" 47.90.95.69:/tmp/CentOS-7-x86_64-DVD.iso .

# 使用 ssh 的详细 debug 模式
ssh -vvv root@127.0.0.1

# 利用 ncat 发送数据包: 从 1.txt 读取内容并以 ipv4 的 udp 协议发送到 127.0.0.1 的 8089 端口
nc -4u  127.0.0.1 8089 < 1.txt

```

#### 网络相关

```bash

# 网卡属性
ifconfig

{
    # 网卡混杂模式 - 开启（可以获取到所有流经网卡的包 - 常用于嗅探）
    ifconfig eth0 promisc
    # 网卡混杂模式 - 关闭（只有目标mac与本网卡相同的包才会被获取）
    ifconfig eth0 -promisc
}

# 查看当前所有 TCP 连接，并筛选出被监听的端口
netstat -anoptl

{
    # IP table 抛弃所有来自指定 IP 的 TCP 包
    iptables -A INPUT -p tcp -s 192.168.152.134 -j DROP
    # IP table 不发送 RST 到指定 IP
    iptables -A OUTPUT -p tcp -d 192.168.152.134 --tcp-flags RST RST -j DROP
}

{
    # ARP 绑定 MAC - 单个
    arp -s 192.168.152.206 00:50:56:C0:00:01
    # ARP 绑定 MAC - 多个
    arp -f /etc/ip_mac
}

{
    # 终止监听指定端口的进程(不加 -TERM 则默认 -KILL/-9 )
    fuser -k -TERM 8501/tcp 8502/tcp
    lsof -sTCP:LISTEN -ti:12301 -ti:12302|xargs kill
}

# 查看指定 pid 进程的 socket 对象
ll /proc/1991/fd/

{
    # 设置代理
    export https_proxy="http://10.47.34.211:23339/"
    export http_proxy="http://10.47.34.211:23339/"
    export ftp_proxy="http://10.47.34.211:23339/"

    # 直接设置 all_proxy 也可 (可能对 wget 无效)
    export all_proxy=socks5://127.0.0.1:10086/
    # 取消设置
    unset all_proxy
}

{
    # 端口存活检测（粗暴）
    echo > /dev/tcp/www.baidu.com/443

    # （后台并发运行）循环检测：
    # 使用 timeout 控制每个请求的超时
    # 用 2>/dev/null 屏蔽错误提示

    for i in {1..200}; do { timeout 3 bash -c "echo > /dev/tcp/192.168.1.112/$i" 2>/dev/null && echo $i good >>re.txt ;} & done &
}

```

#### 系统管理类

```bash

# 硬件信息相关
dmidecode

# CPU信息
lscpu
cat /proc/cpuinfo

# 内存信息
free -m
numactl --hardware
cat /proc/meminfo

# 查看系统是32位还是64位
getconf LONG_BIT
file /bin/ls

# 查看系统版本
uname -a
cat /var/log/kernel-version
cat /etc/redhat-release
cat /etc/issue

# 将一个目录挂载到另一个目录
mount --bind /data/opt /opt

# 为指定文件预分配指定大小的空间（单位： K M G T P E Z Y）
fallocate -l 10G testfile

# 从内存划分指定大小的空间到磁盘上（提高 /testdir 的 io 速度，但 umount 时会清空里面的数据）
mount -t tmpfs tmpfs /testdir -o size=1024m

# 创建稀疏文件/占位文件
dd of=testfile bs=1K seek=512 count=0    # 512K

# 二进制查看文件
od -c testfile

# 终止进程，-9表示强制终止
kill -9 pid1,pid2

# 查看文件被谁使用
lsof /tmp

# 查看所有用户的所有进程，并筛选出指定进程
ps aux|grep nginx

# 使用top输出实时资源使用
top -b -n 1

{
    # 进程管理
    # 列出进程模块
    pmap 1024
    # 查PID=1024对应进程的句柄:
    ll /proc/1024
}

# 向上递归查看当前路径的属性
namei -l `pwd`

# 查看开机时间
uptime

# 设置时间/写入bios
date -s "2017-11-24 15:54:00"
clock –w

# 同步系统时间为互联网时间
ntpdate time.nist.gov

{
    # 追踪系统调用
    strace -C -T -tt -e trace=all [-p 2229 | ls /tmp]
    : """
        -k  打印堆栈
        -f  跟踪 fork 产生的子进程
        -tt 在输出中的每一行前加上时间信息,微秒级
        -T  显示每一个调用所耗的时间
        -o  输出到指定文件
        -p  进程pid
        -C  在CTRL+C后输出调用的统计

        trace=read,write 只显示读取和输出事件
    """
}
```

#### 命令技巧

```bash

{
    # 行内执行 (推荐后一种)
    echo `whoami` $(whoami)

    # 双引号使echo输出的结果正常换行
    echo "`ps`" "$(ps)"
}

# 在bash中，空 -- 代表参数结束，跟在后面的所有字符都会被视为普通字符串
touch -- --name

# 以root身份执行上一条命令
sudo !!

# 切换到上一次访问的目录
cd -

# 格式化输出 (空格全部转为合适长度的 \t)
mount | column -t

# 指定 xargs 的替换位置，-i 指定要替换的字符，不指定时会扩充到最后，默认是替换 {}
ls |xargs -i{} echo "{} is /full/path/{}"

# 添加一个模拟的 service 命令（在 docker 容器里用）
service(){ /bin/bash -c "/etc/init.d/$*"; }

{
    # 开CPU暖手模式取暖 - 充分燃烧 CPU
    for (( i = 1; i <= $(sysctl -n hw.ncpu); i++ )); do yes > /dev/null & done
    # 关闭取暖模式
    killall yes
}

# 保持shell活跃
while (true); do date && sleep 60 ; done

```
