
# nginx 推荐配置

## 最外层的配置
```bash

# 最优值取决于许多因素，包括（但不限于）CPU核心数、存储数据的硬盘数量及负载模式, 设置为 "auto" 让 nginx 将自动检测它
# 如果手动设定该值，不应该超过CPU核心数
worker_processes auto;

# 限制worker进程的最大打开文件数，优先于`ulimit -n`，配置此项可以解决 "too many open files" 的问题
# `worker_processes` * `worker_rlimit_nofile` < `cat /proc/sys/fs/file-max` 受 linux 最大打开文件数限制
worker_rlimit_nofile 100000;
```

## events模块
```bash
events {
    # 每个 worker_processes 最大连接数（包括 nginx 与客户端的连接和 nginx 与服务端的连接）
    # 注意，此项不会超过 worker_rlimit_nofile
    worker_connections 20000;
    # off：每次只接受一个新连接
    # on：接受所有的新连接
    multi_accept on;
}
```

## http模块
```bash
http {
    # 不向客户端返回 nginx 的版本号，提高安全性
    server_tokens off;
    # 提高文件传输效率
    sendfile on;
    # 优化 sendfile 的传输效率
    tcp_nopush on;
    # 提高实时传输速度
    tcp_nodelay on;

    # 超过这个时间而服务端没有返回数据到 nginx ，则关闭连接
    # 此项默认值为60，调用可能需要花费数分钟的外部接口时，增大此项
    proxy_read_timeout 600;
    # 超过这个时间而服务端没有响应 nginx 发送的数据，则关闭连接
    proxy_send_timeout 30;
    # 超过这个时间而客户端没有响应 nginx 发送的数据，则关闭连接
    send_timeout 30;

    # keepalive 的持续时间，设置太长会消耗服务器资源
    # 如果是用于一次性请求的 api 接口，可以设置此项为0关闭 keepalive
    keepalive_timeout 30;
    # 默认保持的 keepalive 的数量为100，并发访问量大的网站可以增大此项
    # 注意，此项不会高于 worker_connections
    keepalive_requests 10000;
    # 主动释放超时的连接
    reset_timedout_connection on;

    # 启用 gzip 压缩，减少网络流量，提高传输效率
    gzip on;
    # 如果数据小于 1024byte 则不压缩，因为压缩消耗 CPU
    gzip_min_length 1024;
    # 压缩所有代理的请求
    gzip_proxied any;
    # 对指定类型的资源启用压缩
    # 设置为 "*" 对所有类型的资源启用压缩
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    # 对IE6及以下的浏览器关闭压缩
    gzip_disable "msie6";
    
    # 设置请求body的最大长度，默认为1M，如果需要上传大文件可以设置此项为0解除大小限制
    # 配置此项可以解决 "413 Request Entity Too Large" 的问题
    client_max_body_size 10M;

    # 不记录 access_log 可以提高性能
    access_log off;
    # 只记录严重错误，提高性能
    error_log logs/error.log crit;
}
```

## 高级access_log日志

1. 需要安装外部模块
2. 启用此功能可能对性能产生较大影响，如无需要，不必启用

```bash
http {

    # 记录 json 格式的 access_log
    log_format access_log_json ''
        '{'
            '"time_iso8601": "$time_iso8601", '
            '"remote_addr": "$remote_addr", '
            '"remote_user": "$remote_user", '
            '"body_bytes_sent": "$body_bytes_sent", '
            '"request_time": "$request_time", '
            '"status": "$status", '
            '"request": "$request", '
            '"request_method": "$request_method", '
            '"http_referer": "$http_referer", '
            '"http_x_forwarded_for": "$http_x_forwarded_for", '
            '"http_user_agent": "$http_user_agent", '
            '"request_body": "$request_body", '
            '"upstream_addr": "$upstream_addr", '
            '"response_body": "$response_body", '
            '"upstream_status": "$upstream_status", '
            '"upstream_response_time": "$upstream_response_time", '
            '"server_addr": "$server_addr", '
            '"server_port": "$server_port", '
            '"server_name": "$server_name", '
            '"username": "$http_username", '
            '"user_name": "$http_user_name", '
            '"http_content_encoding": "$http_content_encoding", '
            '"upstream_http_content_encoding": "$upstream_http_content_encoding", '
            '"uri": "$uri" '
        '}\r\n';

    server {
        # 每天保存为一个新的日志文件
        if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})") {
            set $year $1;
            set $month $2;
            set $day $3;
        }
        access_log  logs/access.log_$year.$month.$day access_log_json;
        set $response_body "";

        # 启用 ngx_lua 模块获取完整的 response_body
        lua_need_request_body on;
        body_filter_by_lua '
            local response_body = ngx.arg[1]
            ngx.ctx.buffered = (ngx.ctx.buffered or"") .. response_body
            if ngx.arg[2] then
                    ngx.var.response_body = ngx.ctx.buffered
            end
        ';
    }
}
```

## REF

[Nginx中文文档](http://www.nginx.cn/doc/)

[12-nginx-performance-tuning](http://dak1n1.com/blog/12-nginx-performance-tuning/)

[Nginx配置性能优化](http://blog.csdn.net/xifeijian/article/details/20956605)

