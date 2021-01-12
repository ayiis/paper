
- 启动一个简单的 http server

```bash
python2 -m SimpleHTTPServer 8080
python3 -m http.server 8080

# 通过 127.0.0.1:8080 访问
```

- URL编码解码，BODY编码解码

```python
from urllib.parse import unquote, quote

unquote("ls%20-al%20/")

quote("ls -al /")

```




