
## PYTHON 3 编码速查

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

raw_string = ("你好", u"你好", "\u4f60\u597d", u"\u4f60\u597d")
encodings = {
    "unicode": (
        (b"\\u4f60\\u597d", ),
        lambda x: x.encode("unicode-escape"),
        lambda y: y.decode("unicode_escape"),
    ),
    "utf8": (
        (b"\xe4\xbd\xa0\xe5\xa5\xbd", ),
        lambda x: x.encode("utf8"),
        lambda y: y.decode("utf8"),
    ),
    "latin1 + utf8": (
        ("ä½\xa0å¥½", "\xe4\xbd\xa0\xe5\xa5\xbd"),
        lambda x: x.encode("utf8").decode("latin1"),
        lambda y: y.encode("latin1").decode("utf8"),
    ),
    "unicode + latin1": (
        ("\\u4f60\\u597d", ),
        lambda x: x.encode("unicode-escape").decode("latin1"),
        lambda y: y.encode("latin1").decode("unicode_escape"),
    ),
    "utf8 + latin1": (
        ("\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd", ),
        lambda x: x.encode("utf8").decode("latin1").encode("unicode-escape").decode("latin1"),
        lambda y: y.encode("latin1").decode("unicode-escape").encode("latin1").decode("utf8"),
    ),
    "hex": (
        ("e4bda0e5a5bd", ),
        lambda x: x.encode("utf8").hex(),
        lambda y: bytes.fromhex(y).decode("utf8"),
    ),
}


rs = raw_string[0]
for encode_type in encodings:

    good = True
    encode = encodings[encode_type][1]
    decode = encodings[encode_type][2]

    for val in encodings[encode_type][0]:
        assert encode(rs) == val
        assert decode(val) == rs

    print("Checked encode_type: %s" % (encode_type))

print("Done!")

```

## PYTHON 2 编码速查

```python
#!/usr/bin/env python2
# -*- coding: utf-8 -*-

a = "你好"
b = u"你好"
c = "\u4f60\u597d"
d = "\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd"
e = "e4bda0e5a5bd"

aa = "\xe4\xbd\xa0\xe5\xa5\xbd"
bb = u"\u4f60\u597d"
cc = "\\u4f60\\u597d"

print
print "a", type(a), len(a), a
print "b", type(b), len(b), b
print "c", type(c), len(c), c
print "d", type(d), len(d), d
print "e", type(e), len(e), e
print
print "aa", type(aa), len(aa), aa
print "bb", type(bb), len(b), bb
print "cc", type(cc), len(cc), cc

print

print "These are all the same:", all([

    a == aa,

    b == bb,

    c == cc,

])

print "These are all about the convert:", all([

    a == b.encode("utf8"),

    a == c.decode("unicode-escape").encode("utf8"),

    a == d.decode("string_escape"),

    a == e.decode("hex"),

])

print "And we can reverse it:", all([

    b == a.decode("utf8"),

    c == a.decode("utf8").encode("unicode-escape"),

    d == a.encode("string_escape"),

    e == a.encode("hex"),

])


```

## 处理 UTF-8 BOM

byte order mark (BOM) 是在 UTF8 文件中，存在特殊意义的魔术符号（特殊意味着要写额外的代码处理它）

因为历史原因，它能表示： UTF8编码，大端序，小端序，UTF-16，UTF32 ...

目前仍然常见的是，在 window 的软件（向前兼容几十年），例如 notepad 和 excel 等软件仍在使用

文本文件在微软的软件里默认是先判断文件头字节，再默认系统默认编码 (GB2312) 打开

- BUG是，打开 notepad 输入 千十/联通/小丫头/来去/泉水.. 这些字保存，都能够触发编码异常的BUG（输入其它的字会矫正，得到正确编码）

    - 只要字符的ANSI编码值为 0x8YCX ~ 0xBYCX 和 0x8YDX ~ 0xBYDX，都会被解释成 UTF-8 编码 [看雪链接](https://bbs.pediy.com/thread-101120.htm)

通用的解决方案：只需要在文件头的第一个字符写入 BOM_UTF8，微软的软件就能自动识别，同时，大部分的文本处理软件都能自动识别跳过

```python
import codecs

print(codecs.BOM_UTF8)
# utf8: b"\xef\xbb\xbf"

print(codecs.BOM_UTF8.decode("utf8"))
# unicode: "\ufeff"

with open("file.txt", "w") as fp:
    fp.write(codecs.BOM_UTF8.decode("utf8"))
    fp.write("联通")

```















