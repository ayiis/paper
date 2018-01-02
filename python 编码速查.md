```python

# encoding:utf8

a = '你好'
b = u'你好'
c = '\u4f60\u597d'
d = '\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd'
e = 'e4bda0e5a5bd'

print
print 'a', type(a), len(a), a
print 'b', type(b), len(b), b
print 'c', type(c), len(c), c
print 'd', type(d), len(d), d
print 'e', type(e), len(e), e
print

print "These are all about the convert:", all([

    a == b.encode('utf8'),

    a == c.decode('unicode-escape').encode('utf8'),

    a == d.decode('string_escape'),

    a == e.decode('hex'),

])

print "And we can reverse it:", all([

    b == a.decode('utf8'),

    c == a.decode('utf8').encode('unicode-escape'),

    d == a.encode('string_escape'),

    e == a.encode('hex'),
])

```