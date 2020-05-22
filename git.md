## 基本概念

四个分区：工作区、暂存区、本地仓库、远程仓库

    git add     工作区 -> 暂存区 
    git commit  暂存区 -> 本地仓库 
    git push    本地仓库 -> 远程仓库 

    git clone     初始化: 远程仓库 -> 工作区 & 本地仓库
    git pull      远程仓库 -> 工作区 & 本地仓库
    git fetch     远程仓库 -> 本地仓库
    git checkout  本地仓库 -> 工作区

    git diff         工作区 vs 暂存区
    git diff head    工作区 vs 本地仓库
    git diff –cached 暂存区 vs 本地仓库


## 常用命令

`git config [--global] --list`  查看当前目录的配置（git项目下的配置项的优先级高于全局配置）
`git config [--global] -e`  编辑配置
`git config [--global] {user.name "name" || user.email "email"}`  设置提交者的用户信息

`git fetch && git diff my_dev origin/develop` 比较本地版本与本地仓库的版本
`git diff <VERSION> --stat lib/semantic_comprehension/` 比较指定版本

`git config credential.helper store` 将用户名和密码缓存到本地的.git-credentials，明文
`git config credential.helper cache <timout>`

`git push origin branchA:branchB` 提交代码到新的分支
`git checkout -b branchB origin/branchB` 本地工作目录切换到指定分支


## 各状态之间变化

当前状态 | 目标状态 | 命令
------- | ------- | -------
untracked | staged | git add [FILE]
staged | untracked | git rm --cached [FILE]
staged | 删除且不保留文件 | git rm -f [FILE]
tracked | untracked | git rm --cached [FILE]
tracked | modified | 修改文件 touch
modified | tracked | git checkout -- [FILE] 从版本库恢复 <br>git checkout HEAD -- [FILE] 从上一次提交恢复
modified | staged |  git add [FILE]
staged | modified |  git reset HEAD [FILE]
staged | committed | git commit -m "comments"
committed | staged 取消本次commit | git reset --soft HEAD^
- | 从上一次commit取消所有修改 | git reset --hard HEAD
- | 删除所有未跟踪的文件 | git clean [FILE]
- | 修改最后一次提交  |  git commit --amend
- | 回滚第一次提交(将初始化所有提交) |  git update-ref -d HEAD
- | 推送到版本库 | git push [--force] [origin/master]
- | 从版本库删除提交<br>(会抹掉目标及后面的提交记录、history) | git reset --hard <版本号><br>git push origin <分支名> --force


```code
Origin - 未修改
untracked - 未追踪
tracked - 已追踪
modified - 已修改
staged - 已暂存
committed - 已提交未PUSH
```

## git diff 各种符号的意义

符号 | 意义
------- | -------
index | 变动前后的git的哈希值
--- | 变动前的文件
+++ | 变动后的文件
+ | 此行被新增
- | 此行已被删除
@@ -44,192 +47,104 @@ | 合并第一个文件的44~(44+192)行 和 第二个文件的 47~(47+104)行，进行对比<br>此处44行对应47行说明在前面的修改里合计3行被删除，192行对应104行说明本次修改里合计删除88行

diff有三种常用格式，正常格式/上下文格式/合并格式，git使用的是合并格式的diff的变体


# 磨刀石

[gitignore](https://github.com/github/gitignore) 常用的各种.gitignore


* 提交一个空文件夹 .gitignore
```git
# Ignore everything in this directory
*
# Except this file
!.gitignore
```

[diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) Git Better Diff
```bash
brew install diff-so-fancy
OR
yum install -y nodejs
npm install -g diff-so-fancy
```

* git 正常显示中文: 在gitconfig增加一行，不使用\转义
```code
[core]
    quotepath = false
```


# 快速查问题

+ fatal: unable to access 'xxxx': Peer's Certificate issuer is not recognized.

+ fatal: unable to access '.git': SSL certificate problem: unable to get local issuer certificate

    - 原因：证书验证不通过

    - 全局改写 ssl 验证 --> git config --global http.sslVerify false

+ error: RPC failed; curl 18 transfer closed with outstanding read data remaining

+ fatal: The remote end hung up unexpectedly

    https://stackoverflow.com/questions/38618885/error-rpc-failed-curl-transfer-closed-with-outstanding-read-data-remaining

        - git clone http://github.com/large-repository --depth 1

        - cd large-repository

        - git fetch --unshallow

    https://stackoverflow.com/questions/38618885/error-rpc-failed-curl-transfer-closed-with-outstanding-read-data-remaining
        Just because have error when clone by HTTP protocol (curl command).
    https://stackoverflow.com/questions/6842687/the-remote-end-hung-up-unexpectedly-while-git-cloning/6849424

        使用 ssh://git@github.com/ 方式拉取项目

        - git config --global http.postBuffer 524288000

+ error: The requested URL returned error: 401 Unauthorized while

+ fatal: HTTP request failed

    - 检查 git 的版本，`git --version` 升级到最新即可解决

    - gitconfig里面配置了用户名密码，但不正确

