
1. 安装 mysql 和 wordpress
    docker run --name mysql -e MYSQL_ROOT_PASSWORD=8a482793c84679abb1498ffe30a724ff -d mysql:5.7
    docker run --name wordpress --link mysql -p 127.0.0.1:10080:80 -d wordpress

    * 注意 mysql8 会启用新的密码认证方式，目前版本的wordpress尚不支持，所以此处用 mysql:5.7

2. 修改 nginx，进行 http 指向和 https 指向
    location / {
        proxy_pass http://127.0.0.1:10080/ ;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    * 注意 Host 会被渲染到页面上的链接，所以必须与用户请求的 Host 保持一致

3. 在 wordpress 管理页面安装插件 `Really Simple SSL`
    https://help.one.com/hc/en-us/articles/115005594065-Use-https-on-your-WordPress-site

    * 启用 SSL 访问的最简单的方式

Debug.

    docker stop wordpress && docker rm wordpress
    docker stop mysql && docker rm mysql
