
+ #### [获得函数的定义路径](https://stackoverflow.com/questions/50673566/how-to-get-the-path-of-a-function-in-python/50673681)

```python

import inspect

# 不能用于 built-in class 或者 built-in function
inspect.getfile(inspect)

# >>> '/usr/lib/python3.6/inspect.py'

```

+ #### [repr 和 str](https://stackoverflow.com/questions/7784148/understanding-repr-function-in-python)

```python

print("目标字符串含有 \x00 终止符")

# >>> 目标字符串含有  终止符

print(repr("目标字符串含有 \x00 终止符"))

# >>> '目标字符串含有 \x00 终止符'

```

+ #### 追踪变量

```python
import inspect

# 全局变量以dict保存在globals里
{x: globals()[x] for x in globals() if x[:2] != "__"}
# >>> {'inspect': <module 'inspect' from '/usr/lib/python3.6/inspect.py'>}

{
    y: inspect.getfile(eval(y)) for y in [
        x for x in globals() if x[:2] != "__"
    ]
}
# >>> {'inspect': '/usr/lib/python3.6/inspect.py'}


# 局部变量以dict保存在locals里
def test():
    a, c = 42, "all"
    print(locals())
# >>> {'c': 'all', 'a': 42}

# 注意 q.d() 可能会重新构造作用域，locals() 会等同于 globals()
```

+ #### 作用域提升

```python

aa = 11


def test1():
    bb = 22
    cc = 33

    def test2():
        global aa     # 将aa提升到全局变量
        nonlocal bb   # 将bb提升到闭包上层 (可以穿透多层闭包，直到找到bb为止)
        aa = 111
        bb = 222
        cc = 300
        print("第1次 aa:%s, bb:%s, cc:%s" % (aa, bb, cc))

    test2()
    print("第2次 aa:%s, bb:%s, cc:%s" % (aa, bb, cc))


test1()

# >>> 第1次 aa:111, bb:222, cc:300
# >>> 第2次 aa:111, bb:222, cc:33

```

+ #### [使用具名元组](http://python.iswbm.com/en/latest/c01/c01_06.html)

```python

from collections import namedtuple

city = namedtuple("City", "name country polulation coordinates")

tokyo = city("Tokyo", "JP", 36.93, (35.68, 139.69))
# >>> City(name='Tokyo', country='JP', polulation=36.93, coordinates=(35.68, 139.69))

tokyo.polulation
# >>> 36.93

```

+ #### [描述符相关]

```python

__set__
__get__
__delete__

__str__
__repr__
__call__

__setitem__
__delitem__

__setattr__
__getattribute__
__delattr__

super
__dict__

```

+ #### import

```python

os_path = __import__("os.path")

```

#### 使用 Jupyter

https://www.dataquest.io/blog/jupyter-notebook-tutorial/
https://stackoverflow.com/questions/35545402/how-to-run-an-ipynb-jupyter-notebook-from-terminal

优点：
    
    1. 可视化
        直接在页面上调用运行，并且展示结果
        可以展示图表📈

已知的问题：

    1. cell之间的作用域互相影响，实现独立作用域比较麻烦
    2. globals变量被污染

+ #### 调用系统命令

```code

def execute_command(command, encoding=None):
    """
        在 MacOS 下，两种方式未见区别
            处理error时：前者会直接打印无法获取，后者可以获取
    """
    if not encoding:
        return os.popen(command).read()
    else:
        proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        out, err = proc.communicate()
        return (out or err).decode(encoding)

b"".join(subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()).decode("utf8")

```





