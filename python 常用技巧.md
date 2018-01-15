#### 列表去重

```python

>>> list(set([1, 2, 5, 4, 2, 1, 6]))

[1, 2, 4, 5, 6]

```

#### 列表排序

```python

>>> sorted([1, 2, 5, 4, 2, 1, 6], reverse=False)

[1, 1, 2, 2, 4, 5, 6]

>>> sorted([1, 2, 5, 4, 2, 1, 6], key=lambda x: -x)

[6, 5, 4, 2, 2, 1, 1]

```

#### 列表排序(多级排序)

```python

>>> from operator import itemgetter, attrgetter

>>> obj = [{'a': 1, 'c': 2, 'b': 1}, {'a': 2, 'c': 2, 'b': 1}, {'a': 2, 'c': 1, 'b': 2}]

>>> sorted(obj, key=itemgetter('b', 'a'))

[{'a': 1, 'b': 1, 'c': 2}, {'a': 2, 'b': 1, 'c': 2}, {'a': 2, 'b': 2, 'c': 1}]

```

#### 找出列表中第一个符合条件的元素

```python

>>> next((n for n in [1, 2, 5, 4, 1, 6] if n >= 3), -1)

5

```

#### 对象可以直接用==比较（忽略数据类型）

```python

>>> [True] == [1.0] == [0.99999999999999999] == [1]

True

```

#### 与 / 或 / 异或 / 非

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

#### 执行系统命令并获取返回

```python

>>> commands.getstatusoutput('whoami')

(0, 'ayiis')

```

#### 比较操作具有相同的优先级

```python

#等同于 (2 < 3) and (3 < 4) and (4 != 6) and (6 < 7)
>>> 2 < 3 < 4 != 6 < 7

True

```


REF:

+ https://docs.python.org/2/library/functions.html#next

+ https://docs.python.org/2/reference/expressions.html#comparisons
