
+ #### 列表去重

```python

>>> list(set([1, 2, 5, 4, 2, 1, 6]))

[1, 2, 4, 5, 6]

```

+ #### 多重赋值

```python

>>> x, y, z = [1, 3, 2]

>>> print x, y, z

1 3 2

```

+ #### (列表推导)遍历列表，筛选出符合条件的元素

```python

>>> a = [1, 2, 5, 4, 2, 1, 6]

>>> [x for x in a if x > 3]

[5, 4, 6]

```

+ #### 倒序

```python

# 直接改变原对象的值
>>> [1, 3, 5, 2, 4, 6].reserve()

>>> list(reversed([1, 3, 5, 2, 4, 6]))

[6, 4, 2, 5, 3, 1]

>>> a = [1, 3, 5, 2, 4, 6]

>>> a[::-1]

[6, 4, 2, 5, 3, 1]

>>> b = '135246'

>>> b[::-1]

'642531'

```

+ #### 列表排序

```python

>>> sorted([1, 2, 5, 4, 2, 1, 6], reverse=False)

[1, 1, 2, 2, 4, 5, 6]

>>> sorted([1, 2, 5, 4, 2, 1, 6], key=lambda x: -x)

[6, 5, 4, 2, 2, 1, 1]

```

+ #### 列表排序(多级排序)

```python

>>> from operator import itemgetter, attrgetter

>>> obj = [{'a': 1, 'c': 2, 'b': 1}, {'a': 2, 'c': 2, 'b': 1}, {'a': 2, 'c': 1, 'b': 2}]

>>> sorted(obj, key=itemgetter('b', 'a'))

[{'a': 1, 'b': 1, 'c': 2}, {'a': 2, 'b': 1, 'c': 2}, {'a': 2, 'b': 2, 'c': 1}]

```

+ #### [找出列表中第一个符合条件的元素](https://docs.python.org/2/library/functions.html#next)

```python

# 当没有符合条件的元素时，返回默认值，本例的默认值是 -1
>>> next((n for n in [1, 2, 5, 4, 1, 6] if n >= 3), -1)

5

```

+ #### 对象可以直接用==比较（忽略数据类型）

```python

>>> [True] == [1.0] == [0.99999999999999999] == [1]

True

```

+ #### 与 / 或 / 异或 / 非

```python

>>> set([1, 2, 3]) & set([1, 5])

set([1])

>>> set([1, 2, 3]) | set([1, 5])

set([1, 2, 3, 5])

>>> set([1, 2, 3]) ^ set([1, 5])

set([2, 3, 5])

>>> set([1, 2, 3]) - set([1, 5])

set([2, 3])


```

+ #### 执行系统命令并获取返回

```python

>>> commands.getstatusoutput('whoami')

(0, 'ayiis')

```

+ #### [比较操作具有相同的优先级](https://docs.python.org/2/reference/expressions.html#comparisons)

```python

# 等同于 (2 < 5) and (5 > 4) and (4 != 6) and (6 < 7)
>>> 2 < 5 > 4 != 6 < 7

True

```

+ #### 合并数组

```python

>>> [1, 3, 5] + [2, 4, 6]

[1, 3, 5, 2, 4, 6]

```

+ #### 同时遍历多个数组

```python

>>> list1 = ['a', 'b', 'c', 'd']

>>> list2 = [1, 3, 5, 7]

>>> list3 = [2, 4, 6, 8]

>>> print { x:(y * z) for x, y, z in zip(list1, list2, list3) }

{'a': 2, 'c': 30, 'b': 12, 'd': 56}

```

+ #### [多维数组展开](https://stackoverflow.com/questions/952914/making-a-flat-list-out-of-list-of-lists-in-python/952952#952952)

```python

>>> list2 = [ [1, 2], [3, 4, 5] ]

>>> [y for x in list2 for y in x]

[1, 2, 3, 4, 5]

# 看下面这个例子应能更好地理解这种写法
>>> list3 = [ [ [1, 2], [3] ], [ [4], [5, 6] ] ]

>>> [z for x in list3 for y in x for z in y]

[1, 2, 3, 4, 5, 6]

```

+ #### [for-else 循环](https://docs.python.org/2/reference/compound_stmts.html#the-for-statement)


```python

>>> for item in [1, 3, 5, 7, 9]:
        if item % 2 == 0:
            print '%s is not prime' % item
            break
    else:
        print 'all number is prime'


all number is prime

```

+ #### 字典合并


```python

>>> x = {'a': 1, 'b': 2}

>>> y = {'b': 3, 'c': 4}

>>> z = {'c': 5, 'd': 6}

# 属性相同时，旧的值被新的值覆盖
>>> dict( x.items() + y.items() + z.items())

{'a': 1, 'c': 5, 'b': 3, 'd': 6}

# 相加顺序不同会使结果不同
>>> dict( z.items() + y.items() + x.items())

{'a': 1, 'c': 4, 'b': 2, 'd': 6}

# 用update方法在字典x上操作，直接改变字典x的值
>>> x.update(y)

```

+ #### 序列化字符串


```python

>>> obj_string = '{"a":1,"b":2,"c":3}'

>>> import json

>>> json.loads(obj_string)

{u'a': 1, u'c': 3, u'b': 2}

>>> eval(obj_string)

{'a': 1, 'c': 3, 'b': 2}

>>> import ast

>>> ast.literal_eval(obj_string)

{'a': 1, 'c': 3, 'b': 2}

```

+ #### 上下文管理 with


```python

# 自动管理上下文，不需要f.close()
>>> with open('/tmp/a', 'a') as f:
        f.write('hello world')

```

+ #### 拆箱


```python

>>> def do_print(a, b): print a, b

>>> do_print( *[1, 2] )

1 2
>>> do_print( **{"a": 3, "b": 4} )

3 4
>>> do_print( *(5, 6) )

5 6
```

+ #### 字符串拼接


```python

>>> print "%s say %6i hello to %s !" % ("James", 1.55, "Kate")

James say      1 hello to Kate !
>>> print "{name_a} say {time_t:>6.0f} hello to {name_b} !".format(name_a="James", time_t=1.55, name_b="Kate")

James say      2 hello to Kate !
>>> print "%(name_a)s say %(time_t)6i hello to %(name_b)s !" % {"name_a":"James", "time_t":1.55, "name_b":"Kate"}

James say      1 hello to Kate !

```

+ #### 默认字典


```python

>>> seq = range(1, 10)

>>> zip(*[iter(seq)]*3)

[(1, 2, 3), (4, 5, 6), (7, 8, 9)]

```

+ #### 取列表中随机元素


```python

>>> import random

>>> for x in range(10):
        print random.choice(range(100)),

89 13 96 35 23 68 74 49 87 32

```

+ #### 分组


```python

>>> seq = range(1, 10)

>>> zip(*[iter(seq)]*3)

[(1, 2, 3), (4, 5, 6), (7, 8, 9)]

```

Other REF:

+ https://docs.python.org/

+ http://book.pythontips.com/en/latest/index.html

+ http://litaotao.github.io/python-materials

+ http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html

+ https://www.python.org/dev/peps/pep-0008/


