# first of all

You should know that re, the default regex engine for Python, is the second worst among all the major engines (granted, JavaScript wins the loser contest by a long margin.)

You should also know that Python has an alternate regular expressions module called regex, which is possibly the very best engine available in the major languages.


# 常用方法

match

    If zero or more characters at the beginning of string match the regular expression pattern, return a corresponding MatchObject instance. Return None if the string does not match the pattern; note that this is different from a zero-length match.

    * match matches only the beginning, doesn't work with Positive lookahead: (?= )

search

    * re.match与re.search的区别：re.match只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回None；而re.search匹配整个字符串，直到找到一个匹配。

    * .group() === .group(0)

```bash
>>> aa = re.search('cOnN','f connection ',re.I)
>>> aa.span(0)
(2, 6)
>>> aa.group(0)
'conn'
```

findall

test

split

#### sub

    注意 `re.sub(pattern, repl, string[, count, flags])`
    第 4 个参数是替换的字符的个数，不同于其它的是 flags
    请这样书写代码：
        `re.sub("[a-z]", " ", "aFaa893rgg", flags=re.I)`

escape

# 匹配中文

当你需要匹配的字符串含有中文时

re.DOTALL | re.M | re.U

# 遗留问题

```python
import re

re.match(r"^([\w]+\s?){3}$", "abcdef").groups()
('f',)

re.match(r"^([\w]+?\s?){3}$", "abcdef").groups()
('cdef',)

# 这两个正则表达式，都分了3组，第二个是懒惰匹配，它们是根据什么判断每个分组匹配的字符数量的？
```
