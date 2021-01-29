
## 基本操作

+ #### 字符串拼接

```python
print(
    "aaa""bbb"
    "ccc" "ddd"
)
# >>> aaabbbcccddd
```

+ #### map的使用

```python
sum(map(int, "123456789"))
# >>> 45
```

## 主要是列表和字典的操作

+ #### [列表修改](https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types)

```python

alist = [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 删除元素: 赋值为空列表(只要是iterable都可以)
alist[2:8] = []
# >>> [1, 2, 9]
# 或调用删除方法
del alist[2:8]
# >>> [1, 2, 9]

# 分步赋值，元素个数必须相同，所以不能用于删除元素
alist[2:8:2] = [0, 0, 0]
# >>> [1, 2, 0, 4, 0, 6, 0, 8, 9]
# 分步删除
del alist[2:8:2]
# >>> [1, 2, 4, 6, 8, 9]

```

+ #### 列表去重

```python

>>> list(set([1, 2, 5, 4, 2, 1, 6]))

[1, 2, 4, 5, 6]

```

+ #### 多重赋值

```python

>>> x, y, z = [1, 2, 3]

>>> print(z, y, x)

3 2 1

```

+ #### 返回多个值

```python

>>> def foo(): return 1, 2, 3;

>>> x, y, z = foo()

>>> print(z, y, x)

3 2 1

```

+ #### 倒序

```python

# 直接改变原对象的值
>>> a = [1, 3, 5, 2, 4, 6]
>>> a.reverse()
>>> a
[6, 4, 2, 5, 3, 1]

>>> list(reversed([1, 3, 5, 2, 4, 6]))

[6, 4, 2, 5, 3, 1]

>>> a = [1, 3, 5, 2, 4, 6]

>>> a[::-1]

[6, 4, 2, 5, 3, 1]

>>> b = "135246"

>>> b[::-1]

'642531'

```

+ #### 列表排序

```python

>>> sorted([1, 2, 5, 4, 2, 1, 6], reverse=True)

[6, 5, 4, 2, 2, 1, 1]

>>> sorted([1, 2, 5, 4, 2, 1, 6], key=lambda x: -x)

[6, 5, 4, 2, 2, 1, 1]

```

+ #### 列表排序(多级排序)

```python

>>> from operator import itemgetter, attrgetter

>>> obj = [{"a": 1, "c": 2, "b": 1}, {"a": 2, "c": 2, "b": 1}, {"a": 2, "c": 1, "b": 2}]

>>> sorted(obj, key=itemgetter("b", "a"))

[{'a': 1, 'b': 1, 'c': 2}, {'a': 2, 'b': 1, 'c': 2}, {'a': 2, 'b': 2, 'c': 1}]

>>> sorted(obj, key=lambda x: (x["b"], x["a"]))

[{'a': 1, 'b': 1, 'c': 2}, {'a': 2, 'b': 1, 'c': 2}, {'a': 2, 'b': 2, 'c': 1}]

```

+ #### (列表推导)筛选列表中符合条件的元素

```python

>>> a = [1, 2, 5, 4, 2, 1, 6]

>>> [x for x in a if x > 3]

[5, 4, 6]

```

+ #### [找出列表中第一个符合条件的元素](https://docs.python.org/2/library/functions.html#next)

```python

# 当没有符合条件的元素时，返回默认值，本例的默认值是 -1
>>> somelist = [1, 2, 5, 4, 1, 6]

>>> next((n for n in somelist if n >= 3), -1)

5

```

+ #### 从set里安全删除一个元素

```python
>>> a = {"1", "2", "4"}
# 不存在不会报错
>>> a.discard(5)
{'4', '1', '2'}
# 存在就删除
>>> a.discard(2)
{'4', '1'}
```

+ #### 用get安全获取一个属性

```python
>>> d = {"a": 1, "b": 2}
# 存在就获取对应值
>>> d.get("a")
1
# 不存在就返回None
>>> d.get("c")
None
# 不存在就返回指定的值
>>> d.get("c", 0)
0
```


+ #### [返回列表中指定元素的第一个下标](https://stackoverflow.com/questions/8197323/#8197564)

```python

>>> somelist = [1, 2, 5, 4, 1, 6]

>>> somelist.index(4) if 4 in somelist else -1

3

>>> somelist.index(9) if 9 in somelist else -1

-1

```

+ #### 对象可以直接用`==`比较（忽略数据类型）

```python

>>> [True] == [1.0] == [0.99999999999999995] == [1]

True

```

+ #### 向数组指定位置插入多个元素

```python
>>> lst = [1, "2", "3", 4]
>>> lst[2:2] = ["22", "23", "24"]

[1, '2', '22', '23', '24', '3', 4]

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

+ lambda 表达式

```python

>>> ladd = lambda x, y: x + y
>>> ladd(5, 3)

8

# 等价的
>>> (lambda x, y: x + y)(5, 3)

8

```

+ 嵌套 lambda 表达式

```python

>>> ccc = lambda x: (lambda y: y * 5)(x + 2)
>>> ccc(4)

30

```

+ #### 执行系统命令并获取返回

```python

>>> subprocess.getstatusoutput("whoami")

(0, 'ayiis')

```

+ #### [比较操作具有相同的优先级](https://docs.python.org/2/reference/expressions.html#comparisons)

```python

# 等同于 (2 < 5) and (5 > 4) and (4 != 6) and (6 < 7)
>>> 2 < 5 > 4 != 6 < 7

True

```

+ #### 合并列表

```python

>>> [1, 3, 5] + [2, 4, 6]

[1, 3, 5, 2, 4, 6]

```

+ #### 同时遍历多个列表

```python

>>> list1 = ["a", "b", "c", "d"]

>>> list2 = [1, 3, 5, 7]

>>> list3 = [2, 4, 6, 8]

>>> print({x: (y * z) for x, y, z in zip(list1, list2, list3)})

{'a': 2, 'c': 30, 'b': 12, 'd': 56}

```

+ #### [多维列表展开](https://stackoverflow.com/questions/952914/#952952)

```python

>>> list2 = [[1, 2], [3, 4, 5]]

>>> [y for x in list2 for y in x]

[1, 2, 3, 4, 5]

# 看下面这个例子应能更好地理解这种写法
>>> list3 = [[[1, 2], [3]], [[4], [5, 6]]]

>>> [z for x in list3 for y in x for z in y]

[1, 2, 3, 4, 5, 6]

```

+ #### [for-else 循环](https://docs.python.org/2/reference/compound_stmts.html#the-for-statement)

```python

>>> for item in [1, 3, 5, 7, 9]:
        if item % 2 == 0:
            print("%s is not prime" % item)
            break
    else:
        print("all number is prime")

all number is prime

```

+ #### [序列解包](http://python.iswbm.com/en/latest/c01/c01_07.html#id5)

```python

a, b, *rest = [1, 2, 3, 4, 5]
# >>> a = 1, b = 2, rest = [3, 4, 5]

a, *mid, c = [1, 2, 3, 4, 5]
# >>> a = 1, middle = [2, 3, 4], c = 5

```

+ #### 字典合并


```python

>>> x = {"a": 1, "b": 2}

>>> y = {"b": 3, "c": 4}

>>> z = {"c": 5, "d": 6}

# 属性名相同时，旧值被新值覆盖，相加顺序影响结果（python3不支持）
>>> dict(x.items() + y.items() + z.items())

{'a': 1, 'c': 5, 'b': 3, 'd': 6}

# 解包
>>> {**x, **y, **z}

{'a': 1, 'b': 3, 'c': 5, 'd': 6}

# 相加顺序不同会使结果不同
>>> dict(z.items() | y.items() | x.items())

{'a': 1, 'c': 4, 'b': 2, 'd': 6}

# 用update方法在字典x上操作，直接改变字典x的值
>>> x.update(y)

```

+ #### 序列化字符串


```python

>>> obj_string = '{"a":1,"b":2,"c":3}'

>>> import json

# 此方法效率最高
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

# 自动管理上下文，自动 f.close()
>>> with open("/tmp/a", "a") as f:
        f.write("hello world")

# 多个 with
>>> with open("/tmp/a", "w") as wfa, open("/tmp/b", "w") as wfb:
        wfa.write("aa")
        wfb.write("bb")

```

+ #### 拆箱

```python

>>> def do_print(a, b): print(a, b)

>>> do_print(*[1, 2])

1 2

>>> do_print(*(3, 4))

3 4

>>> do_print(**{"a": 5, "b": 6})

5 6
```

+ #### 字符串拼接


```python

>>> print("%s say %6i hello to %s !" % ("James", 1.55, "Kate"))

James say      1 hello to Kate !
>>> print("{name_a} say {time_t:>6.0f} hello to {name_b} !".format(name_a="James", time_t=1.55, name_b="Kate"))

James say      2 hello to Kate !
>>> print("%(name_a)s say %(time_t)6i hello to %(name_b)s !" % {"name_a": "James", "time_t": 1.55, "name_b": "Kate"})

James say      1 hello to Kate !

```

+ #### 取列表中随机元素


```python

>>> import random

>>> for x in range(5): print(random.choice(range(100)))

48
37
76
66
62

```

+ #### 用zip分组


```python

>>> seq = range(1, 10)

>>> list(zip(*[iter(seq)] * 3))

[(1, 2, 3), (4, 5, 6), (7, 8, 9)]

```


+ #### 列表组合


```python

>>> from itertools import combinations

>>> list(combinations([1, 2, 3, 4], 2))

[(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]

>>> list(combinations([1, 2, 3, 4], 3))

[(1, 2, 3), (1, 2, 4), (1, 3, 4), (2, 3, 4)]

```


+ #### 向列表的指定位置插入元素

```python

>>> list1 = [1, 2, 3, 4, 5, 6]

>>> list1[3:3] = ["a", "b", "c"]

[1, 2, 3, 'a', 'b', 'c', 4, 5, 6]

```


Other REF:

+ https://docs.python.org/

+ http://book.pythontips.com/en/latest/index.html

+ http://litaotao.github.io/python-materials

+ http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html

+ https://www.python.org/dev/peps/pep-0008/

+ http://python3-cookbook.readthedocs.io/zh_CN/latest/index.html

