# 0. Docker


# 1. 安装

    yum -y install yum-utils.noarch
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    yum-config-manager --enable docker-ce-edge
    yum-config-manager --enable docker-ce-test
    yum -y install docker-ce

    systemctl start docker


# 2. 使用

    docker version

    docker info
    docker images

    docker search centos
    docker pull centos
        - docker pull centos:6

    docker run --name my_centos -it centos bash

        -$ cat /etc/redhat-release

        -t: 在新容器内指定一个伪终端或终端。
        -i: 允许你对容器内的标准输入 (STDIN) 进行交互
        -d: 后台运行

    - 在已运行的docker容器里启动新的 bash
        # 退出bash不会导致容器退出
        docker exec -it my_centos /bin/bash

    - 查看所有运行的docker容器
        docker ps
        docker ps -a

    - 停止容器的运行
        docker stop xxxxxx

    - 停止所有容器
        docker stop $(docker ps -q)

    - kill all containers:
        docker kill $(docker ps -q)

    - remove all containers / ps
        docker rm $(docker ps -a -q)

    - remove all docker images
        docker rmi $(docker images -q)

    - remove all exited container
        docker ps -a -f status=exited
        docker rm $(docker ps -a -f status=exited -q)

    - clear everything unused:
        docker ps -q | xargs -r docker stop ; docker system purge -a

    - remove all containers by image name:
        docker rm $(docker ps -aq -f ancestor='centos')

    - remove all docker volumes
        docker volume ls -qf dangling=true | xargs -r docker volume rm


    - 比较详细的文档
        https://yeasy.gitbooks.io/docker_practice/install/centos.html

    - 基础
        http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html

    - 搭建自己的仓库
        http://www.ruanyifeng.com/blog/2018/02/docker-wordpress-tutorial.html


    Ctrl + D 关闭容器
    Ctrl + P + Q 退出容器
    - 重命名容器
        docker container rename CONTAINER NEW_NAME

    - mysql
        docker run --name mysql -p 127.0.0.1:13306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest

    - mongodb (-v 需要指定绝对路径)
        docker run --name mongodb -p 127.0.0.1:27017:27017 -v /data/mongodb:/data/db -d mongo

        如果断电重启失败，尝试：
            mongod --dbpath /data/db --repair

    - 一次迁移docker容器的命令
        scp cooker01:/home/deployer/python_project/aypass/trunk/ay_pypi.20200111.tar .
        docker load --input ay_pypi.20200111.tar
        docker start ay_pypi
        docker run --name pypi -d ay_pypi:20200111


## 封装自己的镜像：

    # 启动，随便做点什么
    1. docker run -it centos bash

        touch "i am roshan"

        exit

    # 封装/带信息
    2. docker commit -m "Build centos6_lemp_crmeb 1123" -a "ayiis <ayiis@126.com>" ee40f9b18e57 centos:centos6_lemp_crmeb

    # 查看
    3. docker images

    # 将镜像打包成文件
    docker save -o centos6_lemp_crmeb.tar centos:centos6_lemp_crmeb

    # 从文件导入镜像
    docker load --input centos6_lemp_crmeb.tar


## 端口转发：

    # container停止运行时，host会关闭端口转发
    # 将container的端口+50000转发到 host机
    docker run -itd -p 53306:3306 -p 50080:80 --name centos6_lemp_crmeb centos:centos6_lemp_crmeb
    - 6ca8e9ab6812

    docker start 6ca8e9ab6812 && docker attach 6ca8e9ab6812


# 3. 问题


    使用国内仓库加快下载速度
        - 一次性[不推荐]: docker pull registry.docker-cn.com/library/centos
        - 环境内有效: docker --registry-mirror=https://registry.docker-cn.com daemon
        - 永久有效: vi /etc/docker/daemon.json
            {
                "registry-mirrors": ["https://registry.docker-cn.com"]
            }

        - MacOS: https://www.jianshu.com/p/9fce6e583669
            - 使用 Docker.app 启动 docker 服务

    使用一次性方式下载国内仓库centos遇到问题
        REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
        centos                                  latest              49f7960eb7e4        8 weeks ago         200MB
        registry.docker-cn.com/library/centos   latest              49f7960eb7e4        8 weeks ago         200MB
    名字一样，但ID不一样，没法管理
    所以推荐永久有效的方式

    下载速度太慢
        - 修改 /etc/resolv.conf
            114.114.114.114
        注意：每次start一个docker的container都会被宿主机的配置重载。。。
        原因查stackoverflow


    Cannot connect to the Docker daemon at unix:///var/run/docker.sock.
        - systemctl start docker

    docker config
        /var/lib/docker/containers/[id]/config.v2.json

    docker start no limited
        docker run -it --cap-add=NET_ADMIN --cap-add=NET_RAW centos:latest bash

    is not shared from OS X and is not known to Docker.
        https://stackoverflow.com/questions/45122459/docker-mounts-denied-the-paths-are-not-shared-from-os-x-and-are-not-known
        --> Edit [Docker Preference] -> [File Sharing] -> [Add]

# 4. 注意事项

    - run 和 start 的区别
        run 包含 pull，如果本地没有对应的image就从远程拉取
        start 启动一个 container，使用attach进入到container的主线程bash

    - /etc/resolv.conf 文件在每次start时会更新到跟宿主机一致
        通过 https://docs.docker.com/config/containers/container-networking/ 配置网络

    - 为 centos7 安装基本的组件
        yum -y install initscripts

    - 为 ubuntu 安装基本的组件
        apt-get update
        apt-get install --reinstall build-essential

    - 在macOS中，需要先启动 goo /mine/soft/Docker.app


