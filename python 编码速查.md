```python

# encoding:utf8

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

+ 输出：

```bash
a <type 'str'> 6 你好
b <type 'unicode'> 2 你好
c <type 'str'> 12 \u4f60\u597d
d <type 'str'> 24 \xe4\xbd\xa0\xe5\xa5\xbd
e <type 'str'> 12 e4bda0e5a5bd

aa <type 'str'> 6 你好
bb <type 'unicode'> 2 你好
cc <type 'str'> 12 \u4f60\u597d

These is all the same: True
These are all about the convert: True
And we can reverse it: True
```
