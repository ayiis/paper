# aytool

[Packaging Projects](https://packaging.python.org/tutorials/packaging-projects/)

```shell

# 准备项目package
mkdir aytool
echo name=\"ayiis\" > aytool/__init__.py
echo version=\"1.2.345\" >> aytool/__init__.py
echo nothing >> README.md
touch setup.py

pip3 install --user --upgrade setuptools wheel
# 清空生成目录，否则后面会重复上传
rm dist/* -f
# 生成
python3 setup.py sdist bdist_wheel

```

*setup.py*

```python
import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="aytool",
    version="0.19.821",
    author="ayiis",
    author_email="ayiis@126.com",
    description="ayiis's python tool",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ayiis/aytool",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)
```

[网址](http://127.0.0.1:8011/)

```shell

cd /opt/pypi

# 生成一个 .htpasswd 身份文件
    - yum install -y httpd-tools
htpasswd -nb ayiis 123456 > .htpasswd
mkdir packages && chmod 777 packages

# 测试运行docker（无输出）
docker run -d -p 8011:8080 pypiserver/pypiserver:latest

# 后台启动运行，并且将 packages 映射到宿主机
docker run -d --name pypi -p 8011:8080 -v /opt/pypi/.htpasswd:/data/.htpasswd -v /opt/pypi/packages:/data/packages pypiserver/pypiserver:latest -P .htpasswd packages

# 上传 package (--skip-existing 跳过已经存在的package )
pip3 install --user --upgrade twine
python3 -m twine upload --repository-url http://127.0.0.1:8011/ dist/* && rm dist/* -f
python3 -m twine upload --repository-url https://pypi.ayiis.me/ dist/* && rm dist/* -f

# 安装 package
pip3 install -i http://127.0.0.1:8011/simple/ --no-deps aytool
pip3 install -i https://pypi.ayiis.me/simple/ --no-deps aytool

# 更新 package
pip3 install -i http://127.0.0.1:8011/simple/ --no-deps --upgrade aytool
pip3 install -i https://pypi.ayiis.me/simple/ --no-deps --upgrade aytool

```

[查看包](http://127.0.0.1:8011/simple/aytool/)


# 已知的BUG：
    
    MAC的python有bug，不建议部署在mac上

    https://github.com/pypiserver/pypiserver/issues/263
