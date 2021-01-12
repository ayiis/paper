

## [基础操作](https://cloudxlab.com/blog/numpy-pandas-introduction/)

    可以使用 () 或者 []

    numpy 默认的数据类型 dtype=float

* 创建一个 np.array

```python
import numpy as np

# 从已有的数组里创建一个数组
np.array([3, 4, 5])

# 多维数组必须保证数组的元素个数对应
np.array([[1, 2, 3], [3, 4, 5]])

# 创建一个 2h 5w 的整数数组，用1填充
np.ones((2, 5), dtype=np.int)

# 创建一个 2h 5w 的整数数组，用0填充
np.zeros((2, 5), dtype=np.int)

# 创建一个 2h 5w 的整数数组，用对应的数据类型的默认值填充
# int是0，float是随机数，object是None
np.empty((2, 5), dtype=np.int)

# 创建一个 2h 5w 的空字符串数组
np.full((2, 5), "", dtype=np.object)

# 创建指定 range 的数组 start <= N < end
np.arange(0, 2, 0.3)

# 创建一个平均切分 N 份的数组
np.linspace(0, 2.5, 11)

# 创建一个随机数数组
np.random.rand(2, 3)
```

* 基础属性和操作

```python
import numpy as np

arr = np.random.rand(2, 3)

"""
    基本属性
"""
# 尺寸、形状、数据类型
arr.size, arr.shape, arr.dtype

"""
    基本操作
"""
# 一维展开
arr.flatten()
# 插入、增加、删除
np.append(arr, [1, 2, 3, 4, 5])
np.insert(arr, 0, [1, 2, 3, 4, 5])
np.delete(arr, (2, 3))


# 结构重组
arr.reshape(1, 6)
# 结构倒转
arr.T
# 获取指定范围的元素
arr[1:2, 2]
# 倒序获取指定范围的元素
arr[1:, 2:0:-1]

# 删除指定的行
np.delete(arr, [0], axis=0)
# 删除指定的列
np.delete(arr, [0, 2], axis=1)
# (重置形状) 删除指定位置的元素
np.delete(arr, [2, 3, 4], axis=None)

# (重置形状) 删除指定的值的元素
np.setdiff1d(np.array([[1, 2, 3], [4, 5, 6]]), np.array([1, 2, 5]))
# (重置形状) 获取符合某一个条件的元素
arr[arr < 0.5]

```

## 奇怪的知识

seed 一样时，生成的随机数永远一样（在任何环境）

```code
np.random.seed(0)
np.random.choice(10, (3, 5))
```



```python
import numpy as np
import pandas as pd
np.random.seed(0)
np.random.choice(np.arange(-2, 3, 0.02), (40, 5))
price_range = np.random.choice(np.arange(-2, 3, 0.02), (40, 5))
date_range = pd.date_range("20190101", periods=365)

df = pd.DataFrame(date_range, columns=["date"])

pf = pd.DataFrame(price_range)
pf[5], pf[6] = 0, 0
price_range2 = pf.to_numpy().flatten()
df["rate"] = np.insert(price_range2, 0, [np.nan] * (df.shape[0] - price_range2.size))


class G: raw = 1.0


def rea(x):
    if np.isnan(x):
        return np.nan
    G.raw = G.raw * (1 + x / 100)
    return G.raw


df["price"] = df["rate"].map(rea)

pd.options.plotting.backend = "plotly"
fig = df[["date", "price"]].plot.line(y="price", x="date")
fig.show()

```
